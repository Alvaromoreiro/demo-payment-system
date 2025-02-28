import { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../schemas/auth';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { AuthModel } from '../models/auth';
import { StripeModel } from '../models/stripe';

const jwtSecret = process.env.JWT_SECRET as string;

export class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ error: result.error.format() });
            return;
        }

        const { email, password } = result.data;

        try {
            const user = await AuthModel.login({ email, password });
            const token = jwt.sign({ userId: user.id, userEmail: user.email }, jwtSecret, { expiresIn: '1h' });
            res.cookie('access_token', token, {
                httpOnly: true,
                //secure: process.env.NODE_ENV === 'production',
                //TODO: configurar antes de desplegar
                //sameSite: 'strict'
            }).send(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: 'Error login user' });
            return;
        }
    }

    async register(req: Request, res: Response): Promise<void> {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ error: result.error.format() });
            return;
        }

        const { email, password } = result.data;

        try {
            const user = await AuthModel.register({ email, password });
            await StripeModel.createCustomer({ email, userId: user.id });
            const token = jwt.sign({ userId: user.id, userEmail: user.email }, jwtSecret, { expiresIn: '1h' });
            res.cookie('access_token', token, {
                httpOnly: true,
                //secure: process.env.NODE_ENV === 'production',
                //TODO: configurar antes de desplegar
                //sameSite: 'strict'
            }).send(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: 'Error registering user' });
            return;
        }
    }

    async verifyToken(req: Request, res: Response): Promise<void> {
        const token = req.cookies.access_token;
        if (!token) {
            res.status(403).send('Access not authorized');
        }

        try {
            const data = jwt.verify(token, process.env.JWT_SECRET as string);
            if (typeof data === 'object' && 'userEmail' in data) {
                const userEmail = data.userEmail as string;
                const stripeCustomerId = await StripeModel.getCustomerIdByEmail(userEmail);

                res.json({ stripeCustomerId });
            } else {
                res.status(400).json({ error: 'Invalid token payload' });
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                res.status(403).json({ error: 'Token has expired' });
            } else {
                console.log(error);
                res.status(400).json({ error: 'Error creating payment intent' });
            }
        }
    }
}

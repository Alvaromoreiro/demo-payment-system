import { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../schemas/auth';
import jwt from 'jsonwebtoken';
import { AuthModel } from '../models/auth';

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
}

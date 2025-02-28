import { Router } from 'express';
import { AuthController } from '../controllers/auth';

export const createAppRoutes = () => {
    const appRouter = Router();
    const authController = new AuthController();

    try {
        appRouter.post('/login', authController.login);
        appRouter.post('/register', authController.register);
        appRouter.get('/verifyToken', authController.verifyToken);
    } catch (error) {
        console.log(error);
    }
    return appRouter;
};

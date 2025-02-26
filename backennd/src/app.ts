import { corsMiddleware } from './middlewares/cors';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { createAppRoutes } from './routes/router';

export const createApp = () => {
    const app = express();

    // Deshabilitar la cabecera "X-Powered-By" de Express
    app.disable('x-powered-by');

    // Middleware global: logger y cookies
    app.use(logger('dev'));
    app.use(cookieParser());

    // Rutas específicas con middlewares correspondientes
    app.use(
        '/app',
        corsMiddleware(), // Middleware CORS para las rutas de /chat
        express.json(), // Middleware JSON para /chat
        createAppRoutes(), // Rutas de chat
    );

    const PORT = Number(process.env.PORT) ?? 8080;

    app.listen(PORT, () => {
        console.log(`🚀 App listening on http://localhost:${PORT}`);
    });
};

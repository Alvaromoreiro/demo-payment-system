import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../services/auth';

export const ProtectedRoute = ({ element }: { element: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await verifyToken();
                setAuthenticated(response.ok);
            } catch (error) {
                console.error('Error al verificar token:', error);
                setAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (authenticated === null) {
        return <div>Cargando...</div>;
    }

    return authenticated ? <>{element}</> : <Navigate to="/" replace />;
};

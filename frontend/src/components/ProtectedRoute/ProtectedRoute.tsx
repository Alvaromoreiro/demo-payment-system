import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const useAuth = () => {
    // Comprobar si la cookie 'access_token' existe
    const cookies = document.cookie.split('; ');
    const accessToken = cookies.find((row) => row.startsWith('access_token='));
    return accessToken ? true : false;
};

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
    return useAuth() ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;

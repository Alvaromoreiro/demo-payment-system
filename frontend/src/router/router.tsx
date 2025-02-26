import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { Dashboard } from '../components/Dashboard/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute element={<Dashboard />} />,
    },
]);

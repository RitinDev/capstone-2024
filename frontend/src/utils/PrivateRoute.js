import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function PrivateRouteWrapper() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default PrivateRouteWrapper;

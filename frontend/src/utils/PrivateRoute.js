import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';

function PrivateRouteWrapper() {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        console.log('PrivateRouteWrapper: ', isAuthenticated);
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default PrivateRouteWrapper;

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function PrivateRouteWrapper({ children }) {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRouteWrapper;

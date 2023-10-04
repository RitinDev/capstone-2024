import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRouteWrapper = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !shouldRedirect) {
      setShouldRedirect(true);
    }
  }, [isAuthenticated, shouldRedirect]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/login');
    }
  }, [navigate, shouldRedirect]);

  if (shouldRedirect) {
    return null;
  }

  return <Outlet />;
};

export default PrivateRouteWrapper;

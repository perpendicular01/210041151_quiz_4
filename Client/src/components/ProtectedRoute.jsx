import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (requiredRole && user.role !== requiredRole) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    }
  }, [user, loading, requiredRole]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return authorized ? children : null;
};

export default ProtectedRoute;

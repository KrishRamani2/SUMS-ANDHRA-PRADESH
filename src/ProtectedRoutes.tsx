import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from './store/loginStore';

interface ProtectedRouteProps {
  requireAuth?: boolean;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requireAuth = true,
  allowedRoles = [] 
}) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    if (user?.role === 'GOVERNMENT') {
      return <Navigate to="/super-admin" replace />;
    } else if (user?.role === 'PRINCIPAL') {
      return <Navigate to="/" replace />;
    }
  }

  if (
    requireAuth && 
    isAuthenticated && 
    allowedRoles.length > 0 && 
    user && 
    !allowedRoles.includes(user.role)
  ) {
    if (user.role === 'GOVERNMENT') {
      return <Navigate to="/super-admin" replace />;
    } else if (user.role === 'PRINCIPAL') {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
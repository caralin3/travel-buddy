import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from './pageRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const RequireAuth: React.FC = ({ children }) => {
  const isAuthenticated = useSelector<RootState>((state) => state.session.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { DASHBOARD_ROUTE } from './routes';

export const PublicRoute: React.FC = ({ children }) => {
  const isAuthenticated = useSelector<RootState>((state) => state.session.isAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={DASHBOARD_ROUTE} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

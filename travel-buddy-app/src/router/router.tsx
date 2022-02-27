import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DasboardPage, RegisterPage, LoginPage, HomePage } from '../04-pages';
import { ABOUT_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from './pageRoutes';
import { PublicRoute } from './PublicRoute';
import { RequireAuth } from './RequireAuth';

export const Router: React.FC = () => (
  <Routes>
    <Route path={HOME_ROUTE} element={<HomePage />} />
    {/* @TODO */}
    <Route path={ABOUT_ROUTE} element={<HomePage />} />
    <Route
      path={REGISTER_ROUTE}
      element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      }
    />
    <Route
      path={LOGIN_ROUTE}
      element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      }
    />
    <Route
      path={DASHBOARD_ROUTE}
      element={
        <RequireAuth>
          <DasboardPage />
        </RequireAuth>
      }
    />
  </Routes>
);

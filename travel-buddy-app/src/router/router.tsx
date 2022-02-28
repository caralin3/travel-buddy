import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardPage, RegisterPage, LoginPage, HomePage, TripsPage } from '../04-pages';
import { PublicRoute } from './PublicRoute';
import { RequireAuth } from './RequireAuth';

export const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    {/* @TODO */}
    <Route path="about" element={<HomePage />} />
    <Route
      path="register"
      element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      }
    />
    <Route
      path="login"
      element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      }
    />
    <Route
      path="dashboard"
      element={
        <RequireAuth>
          <DashboardPage />
        </RequireAuth>
      }
    />
    <Route
      path="trips"
      element={
        <RequireAuth>
          <TripsPage />
        </RequireAuth>
      }
    >
      <Route
        path="add"
        element={
          <RequireAuth>
            <TripsPage />
          </RequireAuth>
        }
      />
      <Route
        path=":id"
        element={
          <RequireAuth>
            <TripsPage />
          </RequireAuth>
        }
      />
    </Route>
  </Routes>
);

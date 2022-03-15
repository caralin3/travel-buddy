import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  DashboardPage,
  RegisterPage,
  LoginPage,
  HomePage,
  TripsPage,
  TripsEditPage,
  TripsAddPage,
  FlightDetailPage,
  FlightsPage,
  TripDetailPage,
} from '../04-pages';
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
    />
    <Route
      path="trips/add"
      element={
        <RequireAuth>
          <TripsAddPage />
        </RequireAuth>
      }
    />
    <Route
      path="trips/:id"
      element={
        <RequireAuth>
          <TripDetailPage />
        </RequireAuth>
      }
    />
    <Route
      path="trips/edit/:id"
      element={
        <RequireAuth>
          <TripsEditPage />
        </RequireAuth>
      }
    />
    <Route
      path="flights"
      element={
        <RequireAuth>
          <FlightsPage />
        </RequireAuth>
      }
    />
    <Route
      path="flights/:id"
      element={
        <RequireAuth>
          <FlightDetailPage />
        </RequireAuth>
      }
    />
  </Routes>
);

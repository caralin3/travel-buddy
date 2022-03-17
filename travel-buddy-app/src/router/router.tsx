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
  CruisesPage,
  CruiseDetailPage,
  FlightsAddPage,
  FlightsEditPage,
  ActivitiesEditPage,
  ActivitiesAddPage,
  HotelsEditPage,
  HotelsAddPage,
  PortsEditPage,
  PortsAddPage,
  CruisesEditPage,
  CruisesAddPage,
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
    <Route
      path="flights/add"
      element={
        <RequireAuth>
          <FlightsAddPage />
        </RequireAuth>
      }
    />
    <Route
      path="flights/edit/:id"
      element={
        <RequireAuth>
          <FlightsEditPage />
        </RequireAuth>
      }
    />
    <Route
      path="cruises"
      element={
        <RequireAuth>
          <CruisesPage />
        </RequireAuth>
      }
    />
    <Route
      path="cruises/:id"
      element={
        <RequireAuth>
          <CruiseDetailPage />
        </RequireAuth>
      }
    />
    <Route
      path="cruises/add"
      element={
        <RequireAuth>
          <CruisesAddPage />
        </RequireAuth>
      }
    />
    <Route
      path="cruises/edit/:id"
      element={
        <RequireAuth>
          <CruisesEditPage />
        </RequireAuth>
      }
    />
    <Route
      path="ports/add"
      element={
        <RequireAuth>
          <PortsAddPage />
        </RequireAuth>
      }
    />
    <Route
      path="ports/edit/:id"
      element={
        <RequireAuth>
          <PortsEditPage />
        </RequireAuth>
      }
    />
    <Route
      path="hotels/add"
      element={
        <RequireAuth>
          <HotelsAddPage />
        </RequireAuth>
      }
    />
    <Route
      path="hotels/edit/:id"
      element={
        <RequireAuth>
          <HotelsEditPage />
        </RequireAuth>
      }
    />
    <Route
      path="activities/add"
      element={
        <RequireAuth>
          <ActivitiesAddPage />
        </RequireAuth>
      }
    />
    <Route
      path="activities/edit/:id"
      element={
        <RequireAuth>
          <ActivitiesEditPage />
        </RequireAuth>
      }
    />
  </Routes>
);

import React from 'react';
import { useParams } from 'react-router-dom';
import { TripFormContainer } from '../containers';

export interface TripsEditPageProps {}

export const TripsEditPage: React.FC<TripsEditPageProps> = () => {
  const { id } = useParams();
  return <TripFormContainer tripId={Number(id)} />;
};

import React from 'react';
import { useParams } from 'react-router-dom';
import { FlightFormContainer } from '../containers';

export interface FlightsEditPageProps {}

export const FlightsEditPage: React.FC<FlightsEditPageProps> = () => {
  const { id } = useParams();
  return <FlightFormContainer flightId={Number(id)} />;
};

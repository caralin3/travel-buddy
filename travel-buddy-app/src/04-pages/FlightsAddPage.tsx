import React from 'react';
import { Container } from 'reactstrap';
import { FlightFormContainer } from '../containers';

export interface FlightsAddPageProps {}

export const FlightsAddPage: React.FC<FlightsAddPageProps> = () => {
  return (
    <Container className="py-5">
      <FlightFormContainer />
    </Container>
  );
};

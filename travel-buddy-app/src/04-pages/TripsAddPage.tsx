import React from 'react';
import { Container } from 'reactstrap';
import { TripFormContainer } from '../containers';

export interface TripsAddPageProps {}

export const TripsAddPage: React.FC<TripsAddPageProps> = () => {
  return (
    <Container className="py-5">
      <TripFormContainer />
    </Container>
  );
};

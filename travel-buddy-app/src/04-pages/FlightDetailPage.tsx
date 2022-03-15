import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { FlightDetail } from '../03-components';
import { flights } from '../__mocks__/flights';

export interface FlightDetailPageProps {}

export const FlightDetailPage: React.FC<FlightDetailPageProps> = () => {
  const { id } = useParams();
  const flight = flights[0];

  return (
    <Container className="py-5">
      <FlightDetail showTrip flight={flight} />
    </Container>
  );
};

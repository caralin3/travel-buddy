import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { EmptyMessage } from '../01-atoms';
import { FlightDetail } from '../03-components';
import { FLIGHTS_ROUTE } from '../router';
import { RootState } from '../store';
import * as flightsState from '../store/reducers/flights';

export interface FlightDetailPageProps {}

export const FlightDetailPage: React.FC<FlightDetailPageProps> = () => {
  const { id } = useParams();

  const flight = useSelector((state: RootState) => flightsState.selectById(state, Number(id)));

  return (
    <Container className="py-5">
      {!!flight ? (
        <FlightDetail showTrip flight={flight} />
      ) : (
        <Container className="pt-5">
          <EmptyMessage message="Flight not found" link={{ label: 'Return to view Flights', path: FLIGHTS_ROUTE }} />
        </Container>
      )}
    </Container>
  );
};

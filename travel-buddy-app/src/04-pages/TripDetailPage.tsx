import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { EmptyMessage } from '../01-atoms';
import { TripDetail } from '../03-components';
import { TRIPS_ROUTE } from '../router';
import { RootState } from '../store';
import * as tripsState from '../store/reducers/trips';

export interface TripDetailPageProps {}

export const TripDetailPage: React.FC<TripDetailPageProps> = () => {
  const { id } = useParams();

  const trip = useSelector((state: RootState) => tripsState.selectById(state, Number(id)));

  return (
    <div className="pb-5">
      {!!trip ? (
        <TripDetail trip={trip} />
      ) : (
        <Container className="pt-5">
          <EmptyMessage message="Trip not found" link={{ label: 'Return to view Trips', path: TRIPS_ROUTE }} />
        </Container>
      )}
    </div>
  );
};

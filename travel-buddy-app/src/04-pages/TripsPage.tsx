import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, ListGroup } from 'reactstrap';
import { EmptyMessage } from '../01-atoms';
import { ListItem } from '../02-molecules';
import { ADD_TRIPS_ROUTE, TRIPS_ROUTE } from '../router';
import { RootState } from '../store';
import * as tripsState from '../store/reducers/trips';
import { formatDate, SHORT_DATE_FORMAT } from '../utils';

export interface TripsPageProps {}

export const TripsPage: React.FC<TripsPageProps> = () => {
  const navigate = useNavigate();

  const trips = useSelector((state: RootState) => tripsState.selectAll(state));

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center justify-content-center position-relative pb-3">
        <h1 className="">Trips</h1>
        <Link className="btn btn-secondary position-absolute" style={{ right: 0 }} to={ADD_TRIPS_ROUTE}>
          Add New Trip
        </Link>
      </div>
      {trips && trips.length > 0 ? (
        <ListGroup>
          {trips.map((trip) => (
            <ListItem
              key={trip.id}
              heading={trip.title}
              description={trip.description}
              dates={`${formatDate(trip.startDate, SHORT_DATE_FORMAT)} - ${formatDate(
                trip.endDate,
                SHORT_DATE_FORMAT
              )}`}
              onClick={() => navigate(`${TRIPS_ROUTE}/${trip.id}`)}
            />
          ))}
        </ListGroup>
      ) : (
        <EmptyMessage message="No trips found" />
      )}
    </Container>
  );
};

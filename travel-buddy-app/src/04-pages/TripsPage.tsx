import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { ADD_TRIPS_ROUTE } from '../router';
import { RootState } from '../store';
import * as tripsState from '../store/reducers/trips';
import { formatDate } from '../utils';

export interface TripsPageProps {}

export const TripsPage: React.FC<TripsPageProps> = () => {
  // const user = useSelector((state: RootState) => state.session.user);
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
            <ListGroupItem className="py-3" key={trip.id}>
              <ListGroupItemHeading>{trip.title}</ListGroupItemHeading>
              <ListGroupItemText className="d-flex flex-column m-0">
                <span>
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </span>
                {!!trip.description && <span className="mt-2">{trip.description}</span>}
              </ListGroupItemText>
            </ListGroupItem>
          ))}
        </ListGroup>
      ) : (
        <p>No trips</p>
      )}
    </Container>
  );
};

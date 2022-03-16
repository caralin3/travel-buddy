import React from 'react';
// import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, ListGroup } from 'reactstrap';
import { ListItem } from '../02-molecules';
import { ADD_FLIGHTS_ROUTE, FLIGHTS_ROUTE } from '../router';
// import { RootState } from '../store';
// import * as flightsState from '../store/reducers/flights';
import { formatDate, SHORT_DATE_FORMAT } from '../utils';
import { flights } from '../__mocks__/flights';

export interface FlightsPageProps {}

export const FlightsPage: React.FC<FlightsPageProps> = () => {
  const navigate = useNavigate();

  // const user = useSelector((state: RootState) => state.session.user);
  // const flights = useSelector((state: RootState) => flightsState.selectAll(state));

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center justify-content-center position-relative pb-3">
        <h1 className="">Flights</h1>
        <Link className="btn btn-secondary position-absolute" style={{ right: 0 }} to={ADD_FLIGHTS_ROUTE}>
          Add New Flight
        </Link>
      </div>
      {flights && flights.length > 0 ? (
        <ListGroup>
          {flights.map((flight) => (
            <ListItem
              heading={`${flight.airline} #${flight.flightNumber} (${flight.confirmationCode})`}
              description={`${flight.departureCity} to ${flight.arrivalCity}`}
              dates={`${formatDate(flight.departureDate, SHORT_DATE_FORMAT)} - ${formatDate(
                flight.arrivalDate,
                SHORT_DATE_FORMAT
              )}`}
              onClick={() => navigate(`${FLIGHTS_ROUTE}/${flight.id}`)}
            />
          ))}
        </ListGroup>
      ) : (
        <em className="h6">No flights found</em>
      )}
    </Container>
  );
};

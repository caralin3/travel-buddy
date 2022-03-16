import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, ListGroup, Row } from 'reactstrap';
import { Card, ListItem } from '../02-molecules';
import { UpcomingTripBanner } from '../03-components';
import { Trip } from '../api';
import {
  ADD_CRUISES_ROUTE,
  ADD_FLIGHTS_ROUTE,
  ADD_TRIPS_ROUTE,
  CRUISES_ROUTE,
  FLIGHTS_ROUTE,
  TRIPS_ROUTE,
} from '../router';
import { RootState } from '../store';
import * as cruisesState from '../store/reducers/cruises';
import * as flightsState from '../store/reducers/flights';
import * as tripsState from '../store/reducers/trips';
import { formatDate, SHORT_DATE_FORMAT } from '../utils';

export interface DashboardPagePageProps {}

export const DashboardPage: React.FC<DashboardPagePageProps> = () => {
  const navigate = useNavigate();
  const MAX_VIEW = 3;

  const trips = useSelector((state: RootState) => tripsState.selectFutureTrips(state)).slice(0, MAX_VIEW);
  const cruises = useSelector((state: RootState) => cruisesState.selectFutureCruises(state)).slice(0, MAX_VIEW);
  const flights = useSelector((state: RootState) => flightsState.selectFutureFlights(state)).slice(0, MAX_VIEW);
  const user = useSelector((state: RootState) => state.session.user);

  const [nextTrip, setNextTrip] = React.useState<Trip | undefined>(undefined);

  React.useEffect(() => {
    if (trips.length > 0) {
      setNextTrip(trips[0]);
    } else {
      setNextTrip(undefined);
    }
  }, [trips]);

  return (
    <div className="dashboard-page">
      <Container className="py-4">
        <h1>Welcome {user?.firstName}!</h1>
      </Container>
      {!!nextTrip && (
        <Row>
          <Col sm={12}>
            <UpcomingTripBanner title={nextTrip.title} date={nextTrip.startDate} />
          </Col>
        </Row>
      )}
      <Container className="py-5">
        <Row>
          <Col sm={4}>
            <Card title="Trips" link={{ label: 'Create Trip', path: ADD_TRIPS_ROUTE }}>
              Add trips to view vacation information such as activities, flights and cruises.
            </Card>
          </Col>
          <Col sm={4}>
            <Card title="Flights" link={{ label: 'Create Flight', path: ADD_FLIGHTS_ROUTE }}>
              Add flights to view information like flight number, departure and arrival details.
            </Card>
          </Col>
          <Col sm={4}>
            <Card title="Cruises" link={{ label: 'Create Cruise', path: ADD_CRUISES_ROUTE }}>
              Add cruises to view ports and activity details along with cruise dates.
            </Card>
          </Col>
        </Row>
        {trips && trips.length > 0 && (
          <Row className="dashboard-page__upcoming py-5">
            <Col>
              <div className="dashboard-page__upcoming-heading">
                <h3>Upcoming Trips</h3>
                <Link to={TRIPS_ROUTE}>View All</Link>
              </div>

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
            </Col>
          </Row>
        )}
        {flights && flights.length > 0 && (
          <Row className="dashboard-page__upcoming pb-5">
            <Col>
              <div className="dashboard-page__upcoming-heading">
                <h3>Upcoming Flights</h3>
                <Link to={FLIGHTS_ROUTE}>View All</Link>
              </div>

              <ListGroup>
                {flights.slice(0, 2).map((flight) => (
                  <ListItem
                    key={flight.id}
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
            </Col>
          </Row>
        )}
        {cruises && cruises.length > 0 && (
          <Row className="dashboard-page__upcoming pb-5">
            <Col>
              <div className="dashboard-page__upcoming-heading">
                <h3>Upcoming Cruises</h3>
                <Link to={CRUISES_ROUTE}>View All</Link>
              </div>

              <ListGroup>
                {cruises.slice(0, 2).map((cruise) => (
                  <ListItem
                    key={cruise.id}
                    heading={`${cruise.cruiseLine}: ${cruise.shipName}`}
                    description={
                      !!cruise.description
                        ? cruise.description
                        : cruise.roundTrip
                        ? cruise.departureCity
                        : cruise.destinationCity
                    }
                    dates={`${formatDate(cruise.startDate, SHORT_DATE_FORMAT)} - ${formatDate(
                      cruise.endDate,
                      SHORT_DATE_FORMAT
                    )}`}
                    onClick={() => navigate(`${CRUISES_ROUTE}/${cruise.id}`)}
                  />
                ))}
              </ListGroup>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

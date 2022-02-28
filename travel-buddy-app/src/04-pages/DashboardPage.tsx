import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Card } from '../02-molecules';
import { UpcomingTripBanner } from '../03-components';
import { ADD_CRUISES_ROUTE, ADD_FLIGHTS_ROUTE, ADD_TRIPS_ROUTE } from '../router';
import { RootState } from '../store';

export interface DashboardPagePageProps {}

export const DashboardPage: React.FC<DashboardPagePageProps> = () => {
  const user = useSelector((state: RootState) => state.session.user);

  return (
    <div>
      <Container className="py-4">
        <h1>Welcome {user?.firstName}!</h1>
      </Container>
      <Row>
        <Col sm={12}>
          <UpcomingTripBanner />
        </Col>
      </Row>
      <Container className="py-5">
        <Row>
          <Col sm={4}>
            <Card title="Trips" link={{ label: 'Add Trip', path: ADD_TRIPS_ROUTE }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Card>
          </Col>
          <Col sm={4}>
            <Card title="Flights" link={{ label: 'Add Flight', path: ADD_FLIGHTS_ROUTE }}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Card>
          </Col>
          <Col sm={4}>
            <Card title="Cruises" link={{ label: 'Add Cruise', path: ADD_CRUISES_ROUTE }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

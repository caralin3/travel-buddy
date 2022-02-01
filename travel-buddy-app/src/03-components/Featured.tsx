import moment from 'moment';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Countdown } from '../02-molecules';

export interface FeaturedProps {}

export const Featured: React.FC<FeaturedProps> = () => (
  <Container fluid className="p-2 shadow border">
    <Row>
      <Col>
        <p>Upcoming Trip</p>
      </Col>
    </Row>
    <Row>
      <Countdown date={moment('05/6/2022').toString()} />
    </Row>
    <Row>
      <Col>
        <h2>Alaskan Cruise</h2>
        <p>{moment('05-06-2022').format('MMMM DD, YYYY')}</p>
      </Col>
    </Row>
  </Container>
);

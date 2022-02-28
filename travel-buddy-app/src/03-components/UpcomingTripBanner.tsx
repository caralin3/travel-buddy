import moment from 'moment';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { Banner, Countdown } from '../02-molecules';

export interface UpcomingTripBannerProps {}

export const UpcomingTripBanner: React.FC<UpcomingTripBannerProps> = () => (
  <Banner>
    <Row>
      <Col>
        <p className="text-uppercase">
          <strong>Upcoming Trip</strong>
        </p>
      </Col>
    </Row>
    <Row>
      <Countdown date={moment('05/6/2022').toString()} />
    </Row>
    <Row>
      <Col>
        <h2>Alaskan Cruise</h2>
        <p className="m-0">
          <strong>{moment('05-06-2022').format('MMMM DD, YYYY')}</strong>
        </p>
      </Col>
    </Row>
  </Banner>
);

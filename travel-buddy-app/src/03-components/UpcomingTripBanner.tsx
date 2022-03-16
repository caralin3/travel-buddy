import moment from 'moment';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { Banner } from '../01-atoms';
import { Countdown } from '../02-molecules';

export interface UpcomingTripBannerProps {
  date: string;
  title: string;
}

export const UpcomingTripBanner: React.FC<UpcomingTripBannerProps> = ({ date, title }) => (
  <Banner>
    <Row>
      <Col>
        <p className="text-uppercase">
          <strong>Upcoming Trip</strong>
        </p>
      </Col>
    </Row>
    <Row>
      <Countdown date={date} />
    </Row>
    <Row>
      <Col>
        <h2>{title}</h2>
        <p className="m-0">
          <strong>{moment(date).format('MMMM DD, YYYY')}</strong>
        </p>
      </Col>
    </Row>
  </Banner>
);

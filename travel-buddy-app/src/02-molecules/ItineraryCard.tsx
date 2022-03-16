import React from 'react';
import { Row, Col } from 'reactstrap';
import { formatDate, SHORT_MONTH_DAY_FORMAT, SHORT_WEEKDAY_FORMAT } from '../utils';

export interface ItineraryCardProps {
  date: string;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({ children, date }) => (
  <Row className="itinerary-card m-0 mb-5 bg-light">
    <Col xs={12} md={2} lg={1} className="m-0 py-3 bg-dark text-white">
      <span className="itinerary-card__date">{formatDate(date, SHORT_MONTH_DAY_FORMAT)}</span>
      <br />
      <span className="text-uppercase">{formatDate(date, SHORT_WEEKDAY_FORMAT)}</span>
    </Col>
    <Col xs={12} md={10} lg={11} className="d-flex flex-column justify-content-center px-4 py-3">
      {children}
    </Col>
  </Row>
);

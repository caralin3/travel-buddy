import React from 'react';
import { Col, Row } from 'reactstrap';

export interface SeaDayDetailProps {
  day: number;
  description?: string;
}

export const SeaDayDetail: React.FC<SeaDayDetailProps> = ({ day, description }) => (
  <div className="port-detail">
    <Row>
      <Col className="port-detail__name text-primary">Day {day}: Sea Day</Col>
    </Row>
    <Row className="my-2">
      <Col xs={6} md={6}>
        <p className="port-detail__label">Notes</p>
        {description}
      </Col>
    </Row>
  </div>
);

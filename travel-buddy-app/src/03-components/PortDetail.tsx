import moment from 'moment';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { Port } from '../api';
import { getDurationHours } from '../utils';

export interface PortDetailProps {
  port: Port;
}

export const PortDetail: React.FC<PortDetailProps> = ({
  port: { arrival, day, departure, description, city, country, state },
}) => {
  const hours = getDurationHours(arrival, departure);

  return (
    <div className="port-detail">
      <Row>
        <Col className="port-detail__name text-primary">
          Day {day}: {city}, {!state ? country : state}
        </Col>
        <Col className="port-detail__hours">
          {hours} hour{hours > 1 ? 's' : ''}
        </Col>
      </Row>
      <Row className="my-2">
        <Col xs={6} md={3}>
          <p className="port-detail__label">Arrive</p>
          {moment(arrival).format('h:mm A')}
        </Col>
        <Col xs={6} md={3}>
          <p className="port-detail__label">Depart</p>
          {moment(departure).format('h:mm A')}
        </Col>
        <Col xs={6} md={6}>
          <p className="port-detail__label">Notes</p>
          {description}
        </Col>
      </Row>
    </div>
  );
};

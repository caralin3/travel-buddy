import moment from 'moment';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { Cruise } from '../api';
import { getDurationDays } from '../utils';

export interface CruiseDetailProps {
  cruise: Cruise;
  end?: boolean;
}

export const CruiseDetail: React.FC<CruiseDetailProps> = ({
  cruise: {
    cabinNumber,
    cruiseLine,
    cabinType,
    departureCity,
    departureCountry,
    departureState,
    destinationCity,
    destinationCountry,
    destinationState,
    endDate,
    roundTrip,
    shipName,
    startDate,
  },
  end = false,
}) => {
  const days = getDurationDays(startDate, endDate);

  return (
    <div className="cruise-detail">
      <Row>
        <Col className="cruise-detail__name text-primary">
          {cruiseLine}: {shipName}
        </Col>
      </Row>
      <Row className="my-2">
        <Col xs={12} md={4}>
          <p className="cruise-detail__label">{end ? 'Arrive' : 'Depart'}</p>
          {end && !roundTrip ? (
            <p className="m-0">
              {destinationCity}, {!!destinationState ? destinationState : destinationCountry} at{' '}
              {moment(endDate).format('h:mm A')}
            </p>
          ) : (
            <p className="m-0">
              {departureCity}, {!!departureState ? departureState : departureCountry} at{' '}
              {moment(end ? endDate : startDate).format('h:mm A')}
            </p>
          )}
        </Col>
        <Col xs={12} md={2}>
          <p className="cruise-detail__label">Duration</p>
          <p className="m-0">
            {days} day{days > 1 ? 's' : ''}
            {roundTrip ? ' (roundtrip)' : ''}
          </p>
        </Col>
        {!end && (
          <Col xs={12} md={6}>
            <p className="cruise-detail__label">Notes</p>
            <p className="cruise-detail__notes m-0">
              Cabin #{cabinNumber} {cabinType ? `(${cabinType.slice(0, 1)}${cabinType.slice(1).toLowerCase()})` : ''}
            </p>
          </Col>
        )}
      </Row>
    </div>
  );
};

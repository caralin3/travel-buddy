import React from 'react';
import { Col, Row } from 'reactstrap';
import { Hotel } from '../api';
import { formatDate, getDurationDays, TIME_FORMAT } from '../utils';

export interface HotelDetailProps {
  checkIn?: boolean;
  hotel: Hotel;
}

export const HotelDetail: React.FC<HotelDetailProps> = ({
  checkIn = false,
  hotel: {
    addressLine1,
    addressLine2,
    checkInDate,
    checkOutDate,
    city,
    country,
    description,
    name,
    postalCode,
    roomCount,
    roomType,
    state,
  },
}) => {
  const nights = getDurationDays(checkInDate, checkOutDate);

  return (
    <div className="hotel-detail">
      <Row>
        <Col xs={12} sm={6} className="hotel-detail__name text-primary">
          {name}
        </Col>
        <Col xs={12} sm={6} className="hotel-detail__address">
          {addressLine1}
          {!!addressLine2 ? ` ${addressLine2}` : ''}, {city}, {state} {!!postalCode ? postalCode : ''}{' '}
        </Col>
      </Row>
      {checkIn ? (
        <Row className="my-2">
          <Col xs={6} md={3}>
            <p className="hotel-detail__label">Check-In</p>
            {formatDate(checkInDate, TIME_FORMAT)}
          </Col>
          <Col xs={6} md={3}>
            <p className="hotel-detail__label">Nights</p>
            {nights}
          </Col>
          {/* <Col xs={6} md={3}>
            <p className="hotel-detail__label">Confirmation</p>
          </Col> */}
          <Col xs={6} md={6}>
            <p className="hotel-detail__label">Notes</p>
            {/* Terminal {terminal}
          {!!seats ? `; Seats ${seats}` : ''} */}
          </Col>
        </Row>
      ) : (
        <Row className="my-2">
          <Col xs={6} md={3}>
            <p className="hotel-detail__label">Check-Out</p>
            {formatDate(checkOutDate, TIME_FORMAT)}
          </Col>
        </Row>
      )}
    </div>
  );
};

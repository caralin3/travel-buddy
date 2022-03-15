import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { Flight } from '../api';
import { TRIPS_ROUTE } from '../router';

export interface FlightDetailProps {
  flight: Flight;
  showTrip?: boolean;
}

export const FlightDetail: React.FC<FlightDetailProps> = ({
  flight: {
    airline,
    arrivalAirport,
    arrivalCity,
    arrivalDate,
    confirmationCode,
    departureAirport,
    departureCity,
    departureDate,
    flightNumber,
    seats,
    terminal,
    trip,
  },
  showTrip = false,
}) => {
  return (
    <div className="flight-detail">
      {showTrip && (
        <Row>
          <Col>
            <Link className="text-dark" to={`${TRIPS_ROUTE}/${trip.id}`}>
              {trip.title}
            </Link>
          </Col>
        </Row>
      )}
      <Row>
        <Col className="flight-detail__name text-primary">
          {airline} #{flightNumber}
        </Col>
        <Col className="flight-detail__cities">
          {departureCity} to {arrivalCity}
        </Col>
      </Row>
      <Row className="my-2">
        <Col xs={6} md={3}>
          <p className="flight-detail__label">Depart</p>
          {moment(departureDate).format('h:mm A')}
        </Col>
        <Col xs={6} md={3}>
          <p className="flight-detail__label">Airport</p>
          {departureAirport}
        </Col>
        <Col xs={6} md={3}>
          <p className="flight-detail__label">Confirmation</p>
          {confirmationCode}
        </Col>
        <Col xs={6} md={3}>
          <p className="flight-detail__label">Notes</p>
          Terminal {terminal}
          {!!seats ? `; Seats ${seats}` : ''}
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={3}>
          <p className="flight-detail__label">Arrive</p>
          {moment(arrivalDate).format('h:mm A')}
        </Col>
        <Col xs={6} md={3}>
          <p className="flight-detail__label">Airport</p>
          {arrivalAirport}
        </Col>
      </Row>
    </div>
  );
};

import moment from 'moment';
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Activity, Flight, Hotel } from '../api';
import { ActivityDetail } from './ActivityDetail';
import { FlightDetail } from './FlightDetail';
import { HotelDetail } from './HotelDetail';

export interface ItineraryCardProps {
  activities: Activity[];
  day: string;
  flights: Flight[];
  hotels: Hotel[];
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({ activities, day, flights, hotels }) => {
  const getFlightByDay = (day: string) =>
    flights.filter((flight) => moment(flight.departureDate).format('YYYY-MM-DD') === day);

  const getHotelCheckInByDay = (day: string) =>
    hotels.filter((hotel) => moment(hotel.checkInDate).format('YYYY-MM-DD') === day);

  const getHotelCheckOutByDay = (day: string) =>
    hotels.filter((hotel) => moment(hotel.checkOutDate).format('YYYY-MM-DD') === day);

  const getActivitiesByDay = (day: string) =>
    activities.filter((activity) => moment(activity.startDate).format('YYYY-MM-DD') === day);

  return (
    <Row className="m-0 mb-5 bg-light">
      <Col xs={12} md={2} lg={1} className="m-0 py-3 bg-dark text-white">
        <span className="itinerary-card__date">{moment(day).format('MM/DD')}</span>
        <br />
        <span className="text-uppercase">{moment(day).format('ddd')}</span>
      </Col>
      <Col xs={12} md={10} lg={11} className="px-4 py-3">
        {getFlightByDay(day).length > 0 &&
          getFlightByDay(day).map((flight) => (
            <div className="itinerary-card__detail">
              <FlightDetail key={flight.id} flight={flight} />
            </div>
          ))}
        {getHotelCheckInByDay(day).length > 0 &&
          getHotelCheckInByDay(day).map((hotel) => (
            <div className="itinerary-card__detail">
              <HotelDetail key={hotel.checkInDate} hotel={hotel} checkIn />
            </div>
          ))}
        {getActivitiesByDay(day).length > 0 && (
          <div className="itinerary-card__detail">
            <ActivityDetail activities={getActivitiesByDay(day)} />
          </div>
        )}
        {getHotelCheckOutByDay(day).length > 0 &&
          getHotelCheckOutByDay(day).map((hotel) => (
            <div className="itinerary-card__detail">
              <HotelDetail key={hotel.checkOutDate} hotel={hotel} />
            </div>
          ))}
      </Col>
    </Row>
  );
};

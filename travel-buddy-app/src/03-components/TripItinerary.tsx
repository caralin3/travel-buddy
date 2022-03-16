import moment from 'moment';
import React from 'react';
import { ItineraryCard } from '../02-molecules';
import { Activity, Cruise, Flight, Hotel } from '../api';
import { ActivityDetail } from './ActivityDetail';
import { CruiseDetail } from './CruiseDetail';
import { FlightDetail } from './FlightDetail';
import { HotelDetail } from './HotelDetail';

export interface TripItineraryProps {
  activities: Activity[];
  day: string;
  cruises: Cruise[];
  flights: Flight[];
  hotels: Hotel[];
}

export const TripItinerary: React.FC<TripItineraryProps> = ({ activities, cruises, day, flights, hotels }) => {
  const getFlightByDay = (day: string) =>
    flights.filter((flight) => moment(flight.departureDate).format('YYYY-MM-DD') === day);

  const getHotelCheckInByDay = (day: string) =>
    hotels.filter((hotel) => moment(hotel.checkInDate).format('YYYY-MM-DD') === day);

  const getHotelCheckOutByDay = (day: string) =>
    hotels.filter((hotel) => moment(hotel.checkOutDate).format('YYYY-MM-DD') === day);

  const getActivitiesByDay = (day: string) =>
    activities.filter((activity) => moment(activity.startDate).format('YYYY-MM-DD') === day);

  const getCruiseStartsByDay = (day: string) =>
    cruises.filter((cruise) => moment(cruise.startDate).format('YYYY-MM-DD') === day);

  const getCruiseEndsByDay = (day: string) =>
    cruises.filter((cruise) => moment(cruise.endDate).format('YYYY-MM-DD') === day);

  return (
    <ItineraryCard date={day}>
      {getFlightByDay(day).length > 0 &&
        getFlightByDay(day).map((flight) => (
          <div className="itinerary-card__detail" key={flight.id}>
            <FlightDetail flight={flight} />
          </div>
        ))}
      {getHotelCheckInByDay(day).length > 0 &&
        getHotelCheckInByDay(day).map((hotel) => (
          <div className="itinerary-card__detail" key={hotel.checkInDate}>
            <HotelDetail hotel={hotel} checkIn />
          </div>
        ))}
      {getCruiseStartsByDay(day).length > 0 &&
        getCruiseStartsByDay(day).map((cruise) => (
          <div className="itinerary-card__detail" key={cruise.id}>
            <CruiseDetail cruise={cruise} />
          </div>
        ))}
      {getCruiseStartsByDay(day).length > 0 &&
        getCruiseStartsByDay(day).map((cruise) => (
          <div className="itinerary-card__detail" key={cruise.id}>
            <CruiseDetail cruise={cruise} />
          </div>
        ))}
      {getActivitiesByDay(day).length > 0 && (
        <div className="itinerary-card__detail">
          <ActivityDetail activities={getActivitiesByDay(day)} />
        </div>
      )}
      {getCruiseEndsByDay(day).length > 0 &&
        getCruiseEndsByDay(day).map((cruise) => (
          <div className="itinerary-card__detail" key={cruise.id}>
            <CruiseDetail end cruise={cruise} />
          </div>
        ))}
      {getHotelCheckOutByDay(day).length > 0 &&
        getHotelCheckOutByDay(day).map((hotel) => (
          <div className="itinerary-card__detail" key={hotel.checkOutDate}>
            <HotelDetail hotel={hotel} />
          </div>
        ))}
    </ItineraryCard>
  );
};

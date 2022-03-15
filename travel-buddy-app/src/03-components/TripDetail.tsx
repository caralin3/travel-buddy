import React from 'react';
import { Flight, Hotel, Trip } from '../api';
import { flights } from '../__mocks__/flights';
import { hotels } from '../__mocks__/hotels';
import { formatDate, getAllDays, getDaysUntil, sortByDate } from '../utils';
import { ItineraryCard } from './ItineraryCard';

export interface TripDetailProps {
  trip: Trip;
}

export const TripDetail: React.FC<TripDetailProps> = ({ trip }) => {
  const sortedHotels: Hotel[] = sortByDate(hotels, 'checkInDate');
  const sortedFlights: Flight[] = sortByDate(flights, 'departureDate');

  const days = getAllDays(trip.startDate, trip.endDate);

  return (
    <div className="trip-detail">
      <div className="trip-detail__header bg-secondary text-white px-5 py-4">
        <div className="d-flex flex-column align-items-start">
          <h1>{trip.title}</h1>
          {!!trip.description && <p dangerouslySetInnerHTML={{ __html: trip.description }} />}
          <p className="h4">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </p>
        </div>
        <p className="trip-detail__until text-uppercase m-0">
          <strong>{getDaysUntil(trip.startDate)}</strong>
          <br />
          <strong>days left</strong>
        </p>
      </div>
      <div className="itinerary px-5 my-4">
        <h3 className="itinerary__title mb-4">Itinerary Details</h3>
        <ItineraryCard days={days} hotels={sortedHotels} flights={sortedFlights} />=
      </div>
    </div>
  );
};

import React from 'react';
import { Activity, Cruise, Flight, Hotel, Trip } from '../api';
import { activities, cruises, flights, hotels } from '../__mocks__';
import { formatDate, getAllDays, getDaysUntil, sortByDate } from '../utils';
import { TripItinerary } from './TripItinerary';

export interface TripDetailProps {
  trip: Trip;
}

export const TripDetail: React.FC<TripDetailProps> = ({ trip }) => {
  const sortedHotels: Hotel[] = sortByDate(hotels, 'checkInDate').filter((hotel: Hotel) => hotel.trip.id === trip.id);
  const sortedFlights: Flight[] = sortByDate(flights, 'departureDate').filter(
    (flight: Flight) => flight.trip.id === trip.id
  );
  const sortedActivities: Activity[] = sortByDate(activities, 'startDate').filter(
    (activity: Activity) => activity.trip.id === trip.id
  );
  const sortedCruises: Cruise[] = sortByDate(cruises, 'startDate').filter(
    (cruise: Cruise) => cruise.trip.id === trip.id
  );

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
        {days.map((day) => (
          <TripItinerary
            key={day}
            activities={sortedActivities}
            cruises={sortedCruises}
            day={day}
            hotels={sortedHotels}
            flights={sortedFlights}
          />
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { Activity, Cruise, Flight, Hotel, Trip } from '../api';
import { activities, cruises, flights, hotels } from '../__mocks__';
import { formatDate, getAllDays, getDaysUntil, sortByDate } from '../utils';
import { TripItinerary } from './TripItinerary';
import { DetailBanner } from '../02-molecules';

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
      <DetailBanner
        title={trip.title}
        description={trip.description}
        endDate={trip.endDate}
        startDate={trip.startDate}
      />
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

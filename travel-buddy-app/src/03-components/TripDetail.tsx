import React from 'react';
import { EmptyMessage } from '../01-atoms';
import { ItineraryCard } from '../02-molecules';
import { Activity, Cruise, Flight, Hotel } from '../api';
import { ADD_ACTIVITIES_ROUTE } from '../router';
import { getEntityByDay } from '../utils';
import { ActivityDetail } from './ActivityDetail';
import { CruiseDetail } from './CruiseDetail';
import { FlightDetail } from './FlightDetail';
import { HotelDetail } from './HotelDetail';

export interface TripDetailProps {
  activities: Activity[];
  day: string;
  cruises: Cruise[];
  flights: Flight[];
  hotels: Hotel[];
}

export const TripDetail: React.FC<TripDetailProps> = ({ activities, cruises, day, flights, hotels }) => (
  <ItineraryCard date={day}>
    {getEntityByDay(flights, 'departureDate', day).length === 0 &&
    getEntityByDay(hotels, 'checkInDate', day).length === 0 &&
    getEntityByDay(cruises, 'startDate', day).length === 0 &&
    getEntityByDay(activities, 'startDate', day).length === 0 &&
    getEntityByDay(cruises, 'endDate', day).length === 0 &&
    getEntityByDay(hotels, 'checkOutDate', day).length === 0 ? (
      <EmptyMessage message="No activities yet" link={{ label: 'Add activity', path: ADD_ACTIVITIES_ROUTE }} />
    ) : (
      <>
        {getEntityByDay(flights, 'departureDate', day).length > 0 &&
          getEntityByDay(flights, 'departureDate', day).map((flight) => (
            <div className="itinerary-card__detail" key={flight.id}>
              <FlightDetail flight={flight} />
            </div>
          ))}
        {getEntityByDay(hotels, 'checkInDate', day).length > 0 &&
          getEntityByDay(hotels, 'checkInDate', day).map((hotel) => (
            <div className="itinerary-card__detail" key={hotel.checkInDate}>
              <HotelDetail hotel={hotel} checkIn />
            </div>
          ))}
        {getEntityByDay(cruises, 'startDate', day).length > 0 &&
          getEntityByDay(cruises, 'startDate', day).map((cruise) => (
            <div className="itinerary-card__detail" key={cruise.id}>
              <CruiseDetail cruise={cruise} />
            </div>
          ))}
        {getEntityByDay(activities, 'startDate', day).length > 0 && (
          <div className="itinerary-card__detail">
            <ActivityDetail activities={getEntityByDay(activities, 'startDate', day)} />
          </div>
        )}
        {getEntityByDay(cruises, 'endDate', day).length > 0 &&
          getEntityByDay(cruises, 'endDate', day).map((cruise) => (
            <div className="itinerary-card__detail" key={cruise.id}>
              <CruiseDetail end cruise={cruise} />
            </div>
          ))}
        {getEntityByDay(hotels, 'checkOutDate', day).length > 0 &&
          getEntityByDay(hotels, 'checkOutDate', day).map((hotel) => (
            <div className="itinerary-card__detail" key={hotel.checkOutDate}>
              <HotelDetail hotel={hotel} />
            </div>
          ))}
      </>
    )}
  </ItineraryCard>
);

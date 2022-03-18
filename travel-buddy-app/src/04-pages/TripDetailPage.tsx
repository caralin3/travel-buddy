import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { EmptyMessage } from '../01-atoms';
import { AddDropdown, DetailBanner } from '../02-molecules';
import { TripDetail } from '../03-components';
import { Activity, Cruise, Flight, Hotel } from '../api';
import { TRIPS_ROUTE } from '../router';
import { RootState } from '../store';
import * as activitiesState from '../store/reducers/activities';
import * as cruisesState from '../store/reducers/cruises';
import * as flightsState from '../store/reducers/flights';
import * as hotelsState from '../store/reducers/hotels';
import * as tripsState from '../store/reducers/trips';
import { getAllDays } from '../utils';

export interface TripDetailPageProps {}

export const TripDetailPage: React.FC<TripDetailPageProps> = () => {
  const { id } = useParams();

  const activities = useSelector((state: RootState) => activitiesState.selectFutureActivities(state)).filter(
    (activity: Activity) => !!trip && activity.trip.id === trip.id
  );
  const cruises = useSelector((state: RootState) => cruisesState.selectFutureCruises(state)).filter(
    (cruise: Cruise) => !!trip && cruise.trip.id === trip.id
  );
  const flights = useSelector((state: RootState) => flightsState.selectFutureFlights(state)).filter(
    (flight: Flight) => !!trip && flight.trip.id === trip.id
  );
  const hotels = useSelector((state: RootState) => hotelsState.selectFutureHotels(state)).filter(
    (hotel: Hotel) => !!trip && hotel.trip.id === trip.id
  );
  const trip = useSelector((state: RootState) => tripsState.selectById(state, Number(id)));

  const [days, setDays] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (trip) {
      setDays(getAllDays(trip.startDate, trip.endDate));
    }
  }, [trip]);

  return (
    <div className="pb-5">
      {!!trip ? (
        <div className="trip-detail">
          <DetailBanner
            title={trip.title}
            description={trip.description}
            endDate={trip.endDate}
            startDate={trip.startDate}
          />
          <div className="itinerary px-5 my-4">
            <div className="d-flex flex-row justify-content-between">
              <h3 className="itinerary__title mb-4">Itinerary Details</h3>
              <AddDropdown />
            </div>
            {days.map((day) => (
              <TripDetail
                key={day}
                activities={activities}
                cruises={cruises}
                day={day}
                hotels={hotels}
                flights={flights}
              />
            ))}
          </div>
        </div>
      ) : (
        <Container className="pt-5">
          <EmptyMessage message="Trip not found" link={{ label: 'Return to view Trips', path: TRIPS_ROUTE }} />
        </Container>
      )}
    </div>
  );
};

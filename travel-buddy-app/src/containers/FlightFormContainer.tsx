import React from 'react';
import { useSelector } from 'react-redux';
import { FlightForm } from '../03-components';
import { FlightRequest } from '../api';
import { RootState } from '../store';
import * as flightsState from '../store/reducers/flights';
import * as tripsState from '../store/reducers/trips';
import { isEndDateValid } from '../utils';

export interface FlightFormContainerProps {
  flightId?: number;
}

export const FlightFormContainer: React.FC<FlightFormContainerProps> = ({ flightId }) => {
  const existingFlight = useSelector((state: RootState) => flightsState.selectById(state, flightId || ''));
  const [nextTrip] = useSelector((state: RootState) => tripsState.selectFutureTrips(state));

  const initialFlight: FlightRequest = {
    airline: '',
    arrivalAirport: '',
    arrivalCity: '',
    arrivalDate: '',
    confirmationCode: '',
    departureAirport: '',
    departureCity: '',
    departureDate: '',
    flightClass: 'ECONOMY',
    flightNumber: '',
    terminal: '',
    tripId: 0,
  };

  const [flight, setFlight] = React.useState<FlightRequest>(initialFlight);
  const [loading, setLoading] = React.useState(false);
  const [endDateInvalid, setEndDateInvalid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (!!flightId && !!existingFlight) {
      setFlight({
        ...existingFlight,
        tripId: existingFlight.trip.id,
      });
    }
  }, [existingFlight, flightId]);

  React.useEffect(() => {
    if (!flightId) {
      setFlight({
        ...initialFlight,
        tripId: nextTrip.id,
      });
    }
  }, [flightId, nextTrip]);

  const handleAdd = async (request: FlightRequest) => {
    // try {
    //   if (accessToken) {
    //     setLoading(true);
    //     const res = await TripService.createTrip(request, accessToken);
    //     if (Trip.is(res)) {
    //       dispatch(tripsState.addTrip(res));
    //       setLoading(false);
    //       navigate(TRIPS_ROUTE);
    //     }
    //   }
    // } catch (err) {
    //   setLoading(false);
    //   handleError(err, (msg) => setErrorMessage(msg));
    // }
  };

  const handleEdit = async (request: FlightRequest) => {
    // try {
    //   if (accessToken) {
    //     setLoading(true);
    //     // const res = await TripService.updateTrip(request, accessToken);
    //     // if (Trip.is(res)) {
    //     // dispatch(tripsState.updateTrip({id: res.id, changes: {}}));
    //     //   navigate(DASHBOARD_ROUTE, { replace: true });
    //     // }
    //   }
    // } catch (err) {
    //   setLoading(false);
    //   handleError(err, (msg) => setErrorMessage(msg));
    // }
  };

  const handleSubmit = () => {
    // if (!isEndDateValid(startDate, endDate)) {
    //   setEndDateInvalid(true);
    // } else if (!!user) {
    //   const req: FlightRequest = {
    //     description,
    //     endDate,
    //     startDate,
    //     title,
    //     userId: user.id,
    //   };
    //   if (!!tripId) {
    //     handleEdit(req);
    //   } else {
    //     handleAdd(req);
    //   }
    // }
  };

  const handleChange = (value: string, field: keyof FlightRequest) => {
    setEndDateInvalid(false);
    setFlight({
      ...flight,
      [field]: value,
    });
  };

  return (
    <FlightForm
      edit={!!flightId}
      flight={flight}
      endDateInvalid={endDateInvalid}
      errorMessage={errorMessage}
      loading={loading}
      onSubmit={handleSubmit}
      setErrorMessage={setErrorMessage}
      setFlightField={handleChange}
    />
  );
};

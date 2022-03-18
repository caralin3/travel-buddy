import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FlightForm } from '../03-components';
import { Flight, FlightRequest, handleError } from '../api';
import FlightService from '../api/services/FlightService';
import { FLIGHTS_ROUTE } from '../router';
import { RootState } from '../store';
import * as flightsState from '../store/reducers/flights';
import * as tripsState from '../store/reducers/trips';
import { isEndDateValid } from '../utils';

export interface FlightFormContainerProps {
  flightId?: number;
}

export const FlightFormContainer: React.FC<FlightFormContainerProps> = ({ flightId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state: RootState) => state.session.token);
  const user = useSelector((state: RootState) => state.session.user);
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
    if (!flightId && !!nextTrip) {
      setFlight({
        ...initialFlight,
        tripId: nextTrip.id,
      });
    }
  }, [flightId, nextTrip]);

  const handleAdd = async (request: FlightRequest) => {
    try {
      if (accessToken) {
        setLoading(true);
        const res = await FlightService.createFlight(request, accessToken);
        if (Flight.is(res)) {
          dispatch(flightsState.addFlight(res));
          setLoading(false);
          navigate(FLIGHTS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleEdit = async (request: FlightRequest) => {
    try {
      if (accessToken && flightId) {
        setLoading(true);
        const res = await FlightService.updateFlight(request, flightId, accessToken);
        if (Flight.is(res)) {
          dispatch(flightsState.updateFlight({ id: res.id, changes: {} }));
          navigate(FLIGHTS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleSubmit = () => {
    if (!isEndDateValid(flight.departureDate, flight.arrivalDate)) {
      setEndDateInvalid(true);
    } else if (!!user) {
      if (!!flightId) {
        handleEdit(flight);
      } else {
        handleAdd(flight);
      }
    }
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

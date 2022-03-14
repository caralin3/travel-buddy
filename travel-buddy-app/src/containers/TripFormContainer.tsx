import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TripForm } from '../03-components';
import { handleError, Trip, TripRequest } from '../api';
import TripService from '../api/services/TripService';
import { TRIPS_ROUTE } from '../router';
import { RootState } from '../store';
import * as tripsState from '../store/reducers/trips';
import { isEndDateValid } from '../utils';

export interface TripFormContainerProps {
  tripId?: number;
}

export const TripFormContainer: React.FC<TripFormContainerProps> = ({ tripId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state: RootState) => state.session.token);
  const user = useSelector((state: RootState) => state.session.user);
  const trip = useSelector((state: RootState) => tripsState.selectById(state, tripId || ''));

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [endDateInvalid, setEndDateInvalid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (!!user && tripId) {
      if (trip) {
        setDescription(trip.description || '');
        setTitle(trip.title);
        setStartDate(trip.startDate);
        setEndDate(trip.endDate);
      }
    }
  }, [tripId]);

  const handleAdd = async (request: TripRequest) => {
    try {
      if (accessToken) {
        setLoading(true);
        const res = await TripService.createTrip(request, accessToken);
        if (Trip.is(res)) {
          dispatch(tripsState.addTrip(res));
          setLoading(false);
          navigate(TRIPS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleEdit = async (request: TripRequest) => {
    try {
      if (accessToken) {
        setLoading(true);
        // const res = await TripService.updateTrip(request, accessToken);
        // if (Trip.is(res)) {
        // dispatch(tripsState.updateTrip({id: res.id, changes: {}}));
        //   navigate(DASHBOARD_ROUTE, { replace: true });
        // }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleSubmit = () => {
    if (!isEndDateValid(startDate, endDate)) {
      setEndDateInvalid(true);
    } else if (!!user) {
      const req: TripRequest = {
        description,
        endDate,
        startDate,
        title,
        userId: user.id,
      };
      if (!!tripId) {
        handleEdit(req);
      } else {
        handleAdd(req);
      }
    }
  };

  const handleTripField = (value: string, field: keyof TripRequest) => {
    setEndDateInvalid(false);
    if (field === 'description') {
      setDescription(value);
    } else if (field === 'title') {
      setTitle(value);
    } else if (field === 'startDate') {
      setStartDate(value);
    } else if (field === 'endDate') {
      setEndDate(value);
    }
  };

  return (
    <TripForm
      description={description}
      edit={!!tripId}
      endDate={endDate}
      endDateInvalid={endDateInvalid}
      errorMessage={errorMessage}
      loading={loading}
      onSubmit={handleSubmit}
      setErrorMessage={setErrorMessage}
      setTripField={handleTripField}
      startDate={startDate}
      title={title}
    />
  );
};

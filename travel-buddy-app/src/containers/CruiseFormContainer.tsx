import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CruiseForm } from '../03-components';
import { Cruise, CruiseRequest, handleError } from '../api';
import CruiseService from '../api/services/CruiseService';
import { FLIGHTS_ROUTE } from '../router';
import { RootState } from '../store';
import * as cruisesState from '../store/reducers/cruises';
import * as tripsState from '../store/reducers/trips';
import { isEndDateValid } from '../utils';

export interface CruiseFormContainerProps {
  cruiseId?: number;
}

export const CruiseFormContainer: React.FC<CruiseFormContainerProps> = ({ cruiseId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state: RootState) => state.session.token);
  const user = useSelector((state: RootState) => state.session.user);
  const existingCruise = useSelector((state: RootState) => cruisesState.selectById(state, cruiseId || ''));
  const [nextTrip] = useSelector((state: RootState) => tripsState.selectFutureTrips(state));

  const initialCruise: CruiseRequest = {
    cruiseLine: '',
    shipName: '',
    cost: 0,
    currency: '',
    cabinNumber: '',
    startDate: '',
    endDate: '',
    departureCity: '',
    departureCountry: '',
    roundTrip: false,
    tripId: 0,
  };

  const [cruise, setCruise] = React.useState<CruiseRequest>(initialCruise);
  const [loading, setLoading] = React.useState(false);
  const [endDateInvalid, setEndDateInvalid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (!!cruiseId && !!existingCruise) {
      setCruise({
        ...existingCruise,
        tripId: existingCruise.trip.id,
      });
    }
  }, [existingCruise, cruiseId]);

  React.useEffect(() => {
    if (!cruiseId && !!nextTrip) {
      setCruise({
        ...initialCruise,
        tripId: nextTrip.id,
      });
    }
  }, [cruiseId, nextTrip]);

  const handleAdd = async (request: CruiseRequest) => {
    try {
      if (accessToken) {
        setLoading(true);
        const res = await CruiseService.createCruise(request, accessToken);
        if (Cruise.is(res)) {
          dispatch(cruisesState.addCruise(res));
          setLoading(false);
          navigate(FLIGHTS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleEdit = async (request: CruiseRequest) => {
    try {
      if (accessToken && cruiseId) {
        setLoading(true);
        const res = await CruiseService.updateCruise(request, cruiseId, accessToken);
        if (Cruise.is(res)) {
          dispatch(cruisesState.updateCruise({ id: res.id, changes: {} }));
          navigate(FLIGHTS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleSubmit = () => {
    if (!isEndDateValid(cruise.startDate, cruise.endDate)) {
      setEndDateInvalid(true);
    } else if (!!user) {
      if (!!cruiseId) {
        handleEdit(cruise);
      } else {
        handleAdd(cruise);
      }
    }
  };

  const handleChange = (value: string, field: keyof CruiseRequest) => {
    setEndDateInvalid(false);
    setCruise({
      ...cruise,
      [field]: value,
    });
  };

  return (
    <CruiseForm
      edit={!!cruiseId}
      cruise={cruise}
      endDateInvalid={endDateInvalid}
      errorMessage={errorMessage}
      loading={loading}
      onSubmit={handleSubmit}
      setErrorMessage={setErrorMessage}
      setCruiseField={handleChange}
    />
  );
};

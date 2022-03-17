import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ActivityForm } from '../03-components';
import { Activity, ActivityRequest, handleError } from '../api';
import ActivityService from '../api/services/ActivityService';
import { FLIGHTS_ROUTE } from '../router';
import { RootState } from '../store';
import * as activitiesState from '../store/reducers/activities';
import * as tripsState from '../store/reducers/trips';
import { isEndDateValid } from '../utils';

export interface ActivityFormContainerProps {
  activityId?: number;
}

export const ActivityFormContainer: React.FC<ActivityFormContainerProps> = ({ activityId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state: RootState) => state.session.token);
  const user = useSelector((state: RootState) => state.session.user);
  const existingActivity = useSelector((state: RootState) => activitiesState.selectById(state, activityId || ''));
  const [nextTrip] = useSelector((state: RootState) => tripsState.selectFutureTrips(state));

  const initialActivity: ActivityRequest = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    cost: 0,
    currency: '',
    addressLine1: '',
    tripId: 0,
  };

  const [activity, setActivity] = React.useState<ActivityRequest>(initialActivity);
  const [loading, setLoading] = React.useState(false);
  const [endDateInvalid, setEndDateInvalid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (!!activityId && !!existingActivity) {
      setActivity({
        ...existingActivity,
        tripId: existingActivity.trip.id,
      });
    }
  }, [existingActivity, activityId]);

  React.useEffect(() => {
    if (!activityId) {
      setActivity({
        ...initialActivity,
        tripId: nextTrip.id,
      });
    }
  }, [activityId, nextTrip]);

  const handleAdd = async (request: ActivityRequest) => {
    try {
      if (accessToken) {
        setLoading(true);
        const res = await ActivityService.createActivity(request, accessToken);
        if (Activity.is(res)) {
          dispatch(activitiesState.addActivity(res));
          setLoading(false);
          navigate(FLIGHTS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleEdit = async (request: ActivityRequest) => {
    try {
      if (accessToken && activityId) {
        setLoading(true);
        const res = await ActivityService.updateActivity(request, activityId, accessToken);
        if (Activity.is(res)) {
          dispatch(activitiesState.updateActivity({ id: res.id, changes: {} }));
          navigate(FLIGHTS_ROUTE);
        }
      }
    } catch (err) {
      setLoading(false);
      handleError(err, (msg) => setErrorMessage(msg));
    }
  };

  const handleSubmit = () => {
    if (!isEndDateValid(activity.startDate, activity.endDate)) {
      setEndDateInvalid(true);
    } else if (!!user) {
      if (!!activityId) {
        handleEdit(activity);
      } else {
        handleAdd(activity);
      }
    }
  };

  const handleChange = (value: string, field: keyof ActivityRequest) => {
    setEndDateInvalid(false);
    setActivity({
      ...activity,
      [field]: value,
    });
  };

  return (
    <ActivityForm
      edit={!!activityId}
      activity={activity}
      endDateInvalid={endDateInvalid}
      errorMessage={errorMessage}
      loading={loading}
      onSubmit={handleSubmit}
      setErrorMessage={setErrorMessage}
      setActivityField={handleChange}
    />
  );
};

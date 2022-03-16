import { createEntityAdapter, createSlice, EntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Activity } from '../../api';
import { isFutureDate } from '../../utils';
import { RootState } from '..';

export interface ActivityState extends EntityAdapter<Activity> {}

const activitiesAdapter = createEntityAdapter<Activity>({
  selectId: (activity) => activity.id,
  sortComparer: (a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf(),
});

export const ActivitiesSlice = createSlice({
  name: 'activities',
  initialState: activitiesAdapter.getInitialState(),
  reducers: {
    reset: () => activitiesAdapter.getInitialState(),
    addActivity: activitiesAdapter.addOne,
    deleteActivity: activitiesAdapter.removeOne,
    loadActivities(state, action: PayloadAction<Activity[]>) {
      activitiesAdapter.setAll(state, action.payload);
    },
    updateActivity: activitiesAdapter.updateOne,
  },
});

export const { reset, addActivity, deleteActivity, loadActivities, updateActivity } = ActivitiesSlice.actions;

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = activitiesAdapter.getSelectors(
  (state: RootState) => state.activities
);

export const selectFutureActivities = (state: RootState) =>
  selectAll(state).filter((activity) => isFutureDate(activity.startDate));

export const selectPastActivities = (state: RootState) =>
  selectAll(state).filter((activity) => !isFutureDate(activity.startDate));

export default ActivitiesSlice.reducer;

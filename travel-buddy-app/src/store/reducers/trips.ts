import { createEntityAdapter, createSlice, EntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '..';
import { Trip } from '../../api';
import { isFutureDate } from '../../utils';

export interface TripState extends EntityAdapter<Trip> {}

const tripsAdapter = createEntityAdapter<Trip>({
  selectId: (trip) => trip.id,
  sortComparer: (a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf(),
});

export const TripsSlice = createSlice({
  name: 'trips',
  initialState: tripsAdapter.getInitialState(),
  reducers: {
    reset: () => tripsAdapter.getInitialState(),
    addTrip: tripsAdapter.addOne,
    deleteTrip: tripsAdapter.removeOne,
    loadTrips(state, action: PayloadAction<Trip[]>) {
      tripsAdapter.setAll(state, action.payload);
    },
    updateTrip: tripsAdapter.updateOne,
  },
});

export const { reset, addTrip, deleteTrip, loadTrips, updateTrip } = TripsSlice.actions;

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = tripsAdapter.getSelectors(
  (state: RootState) => state.trips
);

export const selectFutureTrips = (state: RootState) => selectAll(state).filter((trip) => isFutureDate(trip.startDate));

export const selectPastTrips = (state: RootState) => selectAll(state).filter((trip) => !isFutureDate(trip.startDate));

export default TripsSlice.reducer;

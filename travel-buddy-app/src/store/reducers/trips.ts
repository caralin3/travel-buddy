import { createEntityAdapter, createSlice, EntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Trip } from '../../api';

export interface TripState extends EntityAdapter<Trip> {}

const tripsAdapter = createEntityAdapter<Trip>({
  selectId: (trip) => trip.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
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

export default TripsSlice.reducer;

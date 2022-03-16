import { createEntityAdapter, createSlice, EntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Flight } from '../../api';
import { isFutureDate } from '../../utils';
import { RootState } from '..';

export interface FlightState extends EntityAdapter<Flight> {}

const flightsAdapter = createEntityAdapter<Flight>({
  selectId: (flight) => flight.id,
  sortComparer: (a, b) => moment(a.departureDate).valueOf() - moment(b.departureDate).valueOf(),
});

export const FlightsSlice = createSlice({
  name: 'flights',
  initialState: flightsAdapter.getInitialState(),
  reducers: {
    reset: () => flightsAdapter.getInitialState(),
    addFlight: flightsAdapter.addOne,
    deleteFlight: flightsAdapter.removeOne,
    loadFlights(state, action: PayloadAction<Flight[]>) {
      flightsAdapter.setAll(state, action.payload);
    },
    updateFlight: flightsAdapter.updateOne,
  },
});

export const { reset, addFlight, deleteFlight, loadFlights, updateFlight } = FlightsSlice.actions;

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = flightsAdapter.getSelectors(
  (state: RootState) => state.flights
);

export const selectFutureFlights = (state: RootState) =>
  selectAll(state).filter((flight) => isFutureDate(flight.departureDate));

export const selectPastFlights = (state: RootState) =>
  selectAll(state).filter((flight) => !isFutureDate(flight.departureDate));

export default FlightsSlice.reducer;

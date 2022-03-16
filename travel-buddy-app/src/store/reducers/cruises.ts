import { createEntityAdapter, createSlice, EntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Cruise } from '../../api';
import { isFutureDate } from '../../utils';
import { RootState } from '..';

export interface CruiseState extends EntityAdapter<Cruise> {}

const cruisesAdapter = createEntityAdapter<Cruise>({
  selectId: (cruise) => cruise.id,
  sortComparer: (a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf(),
});

export const CruisesSlice = createSlice({
  name: 'cruises',
  initialState: cruisesAdapter.getInitialState(),
  reducers: {
    reset: () => cruisesAdapter.getInitialState(),
    addCruise: cruisesAdapter.addOne,
    deleteCruise: cruisesAdapter.removeOne,
    loadCruises(state, action: PayloadAction<Cruise[]>) {
      cruisesAdapter.setAll(state, action.payload);
    },
    updateCruise: cruisesAdapter.updateOne,
  },
});

export const { reset, addCruise, deleteCruise, loadCruises, updateCruise } = CruisesSlice.actions;

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = cruisesAdapter.getSelectors(
  (state: RootState) => state.cruises
);

export const selectFutureCruises = (state: RootState) =>
  selectAll(state).filter((cruise) => isFutureDate(cruise.startDate));

export const selectPastCruises = (state: RootState) =>
  selectAll(state).filter((cruise) => !isFutureDate(cruise.startDate));

export default CruisesSlice.reducer;

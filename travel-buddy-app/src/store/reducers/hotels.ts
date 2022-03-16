import { createEntityAdapter, createSlice, EntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Hotel } from '../../api';
import { isFutureDate } from '../../utils';
import { RootState } from '..';

export interface HotelState extends EntityAdapter<Hotel> {}

const hotelsAdapter = createEntityAdapter<Hotel>({
  selectId: (hotel) => hotel.id,
  sortComparer: (a, b) => moment(a.checkInDate).valueOf() - moment(b.checkInDate).valueOf(),
});

export const HotelsSlice = createSlice({
  name: 'hotels',
  initialState: hotelsAdapter.getInitialState(),
  reducers: {
    reset: () => hotelsAdapter.getInitialState(),
    addHotel: hotelsAdapter.addOne,
    deleteHotel: hotelsAdapter.removeOne,
    loadHotels(state, action: PayloadAction<Hotel[]>) {
      hotelsAdapter.setAll(state, action.payload);
    },
    updateHotel: hotelsAdapter.updateOne,
  },
});

export const { reset, addHotel, deleteHotel, loadHotels, updateHotel } = HotelsSlice.actions;

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = hotelsAdapter.getSelectors(
  (state: RootState) => state.hotels
);

export const selectFutureHotels = (state: RootState) =>
  selectAll(state).filter((hotel) => isFutureDate(hotel.checkInDate));

export const selectPastHotels = (state: RootState) =>
  selectAll(state).filter((hotel) => !isFutureDate(hotel.checkInDate));

export default HotelsSlice.reducer;

import { createEntityAdapter, createSlice, EntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Port } from '../../api';
import { isFutureDate } from '../../utils';
import { RootState } from '..';

export interface PortState extends EntityAdapter<Port> {}

const portsAdapter = createEntityAdapter<Port>({
  selectId: (port) => port.id,
  sortComparer: (a, b) => moment(a.arrival).valueOf() - moment(b.arrival).valueOf(),
});

export const PortsSlice = createSlice({
  name: 'ports',
  initialState: portsAdapter.getInitialState(),
  reducers: {
    reset: () => portsAdapter.getInitialState(),
    addPort: portsAdapter.addOne,
    deletePort: portsAdapter.removeOne,
    loadPorts(state, action: PayloadAction<Port[]>) {
      portsAdapter.setAll(state, action.payload);
    },
    updatePort: portsAdapter.updateOne,
  },
});

export const { reset, addPort, deletePort, loadPorts, updatePort } = PortsSlice.actions;

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = portsAdapter.getSelectors(
  (state: RootState) => state.ports
);

export const selectFuturePorts = (state: RootState) => selectAll(state).filter((port) => isFutureDate(port.arrival));

export const selectPastPorts = (state: RootState) => selectAll(state).filter((port) => !isFutureDate(port.arrival));

export default PortsSlice.reducer;

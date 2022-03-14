import { combineReducers } from '@reduxjs/toolkit';
import sessionReducer from './session';
import tripsReducer from './trips';

export const rootReducer = combineReducers({
  session: sessionReducer,
  trips: tripsReducer,
});

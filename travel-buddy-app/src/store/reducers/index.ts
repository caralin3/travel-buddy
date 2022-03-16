import { combineReducers } from '@reduxjs/toolkit';
import activitiesReducer from './activities';
import cruisesReducer from './cruises';
import flightsReducer from './flights';
import hotelsReducer from './hotels';
import portsReducer from './ports';
import sessionReducer from './session';
import tripsReducer from './trips';

export const rootReducer = combineReducers({
  activities: activitiesReducer,
  cruises: cruisesReducer,
  flights: flightsReducer,
  hotels: hotelsReducer,
  ports: portsReducer,
  session: sessionReducer,
  trips: tripsReducer,
});

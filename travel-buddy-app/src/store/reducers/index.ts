import { combineReducers } from '@reduxjs/toolkit';
import sessionReducer from './session';

export const rootReducer = combineReducers({
  session: sessionReducer,
});

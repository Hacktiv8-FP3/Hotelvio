import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './user';
import propertyReducer from './Property';
import guestReducer from './guest';

export const rootReducers = combineReducers({
  login: loginReducer,
  property: propertyReducer,
  guest: guestReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

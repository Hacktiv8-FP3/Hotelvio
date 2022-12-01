import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './user';
import propertyReducer from './Property';
import guestReducer from './guest';
import detailReducer from './Detail';

export const rootReducers = combineReducers({
  login: loginReducer,
  property: propertyReducer,
  guest: guestReducer,
  detail: detailReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

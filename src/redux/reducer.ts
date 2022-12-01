import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './user';
import propertyReducer from './Property';
import guestReducer from './guest';
import detailReducer from './Detail';
import favoritesReducer from './favorites';

export const rootReducers = combineReducers({
  login: loginReducer,
  property: propertyReducer,
  guest: guestReducer,
  detail: detailReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

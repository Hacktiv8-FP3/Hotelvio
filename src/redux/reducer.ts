import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './user';
import propertyReducer from './Property';
import guestReducer from './guest';
import detailReducer from './Detail';
import favoritesReducer from './favorites';
import historyReducer from './history';

export const rootReducers = combineReducers({
  login: loginReducer,
  property: propertyReducer,
  guest: guestReducer,
  detail: detailReducer,
  favorites: favoritesReducer,
  history: historyReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

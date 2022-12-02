import { combineReducers } from '@reduxjs/toolkit';

import detailReducer from './detail';
import favoritesReducer from './favorites';
import guestReducer from './guest';
import historyReducer from './history';
import propertyReducer from './property';
import loginReducer from './user';

export const rootReducers = combineReducers({
  login: loginReducer,
  property: propertyReducer,
  guest: guestReducer,
  detail: detailReducer,
  favorites: favoritesReducer,
  history: historyReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

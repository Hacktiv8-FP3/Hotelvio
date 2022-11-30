import { combineReducers } from '@reduxjs/toolkit';
import topCityReducer from './TopCity';
import loginReducer from './user';

export const rootReducers = combineReducers({
  topCity: topCityReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

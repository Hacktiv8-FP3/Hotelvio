import { combineReducers } from '@reduxjs/toolkit';
import topCityReducer from './TopCity';

export const rootReducers = combineReducers({
  topCity: topCityReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

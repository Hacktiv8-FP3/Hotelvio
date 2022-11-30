import { combineReducers } from '@reduxjs/toolkit';
import topCityReducer from './TopCity';
import loginReducer from './user';
import propertyReducer from './Property';
export const rootReducers = combineReducers({
  topCity: topCityReducer,
  login: loginReducer,
  property: propertyReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

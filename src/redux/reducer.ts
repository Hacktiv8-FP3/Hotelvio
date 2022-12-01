import { combineReducers } from '@reduxjs/toolkit';
import topCityReducer from './TopCity';
import loginReducer from './user';
import propertyReducer from './Property';
import detailReducer from './Detail';

export const rootReducers = combineReducers({
  topCity: topCityReducer,
  login: loginReducer,
  property: propertyReducer,
  detail: detailReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

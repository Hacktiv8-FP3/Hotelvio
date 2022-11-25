import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './product';

export const rootReducers = combineReducers({
  products: productReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

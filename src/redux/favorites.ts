import { createSlice } from '@reduxjs/toolkit';

import { HotelData } from '../utils/types';

interface FavoritesState {
  favorites: HotelData[];
}

const intialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: intialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      const { id } = action.payload;
      const temp = state.favorites.filter(({ id: _id }) => _id !== id);
      state.favorites = temp;
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

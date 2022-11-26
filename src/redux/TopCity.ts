import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { httpClient } from '../services/api';
import { ApiParams, ApiResponse, City } from '../utils/types/api';

function fetchTopDestinations(state: string, page: number, items: number) {
  return httpClient.get<ApiResponse>('/trends/cities', {
    params: {
      state,
      page,
      items,
    },
  });
}

export const getTopDestinations = createAsyncThunk(
  'getTopDestinations',
  async ({ state, page, items }: ApiParams) => {
    try {
      const response = await fetchTopDestinations(state, page, items);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

type CityState = {
  topCity: City[];
  loading: boolean;
  error?: AxiosError;
};

const initialState = {
  topCity: {},
  loading: false,
} as CityState;

const topCitySlice = createSlice({
  name: 'topCity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopDestinations.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getTopDestinations.fulfilled, (state, action) => {
      const { content } = action.payload as ApiResponse;
      return { ...state, loading: false, topCity: content.cities };
    });
    builder.addCase(getTopDestinations.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error as AxiosError };
    });
  },
});

export default topCitySlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { httpClient } from '../services/api';
import { HotelDetail } from '../utils/types';

const fetchDetail = (id: string) => {
  return httpClient
    .post('properties/v2/detail', {
      currency: 'IDR',
      eapid: 46,
      locale: 'en_GB',
      siteId: 321200046,
      propertyId: id,
    })
    .then((res) => {
      const { propertyInfo: data } = res.data.data;
      const resData = {
        name: data.summary.name,
        location: data.summary.location.address.addressLine,
        caption: data.summary.policies.checkinInstructions[0],
        rating: data.summary.overview.propertyRating.rating,
      };
      return resData;
    });
};

export const getHotelDetail = createAsyncThunk(
  'getHotelDetail',
  async (id: string) => {
    try {
      const res = fetchDetail(id).then((res) => res);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

type DetailState = {
  loading: boolean;
  error?: AxiosError;
  data?: HotelDetail;
};

const intialState = {
  data: {},
  loading: false,
} as DetailState;

const detailSlice = createSlice({
  name: 'detail',
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHotelDetail.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getHotelDetail.fulfilled, (state, action) => {
      return { ...state, loading: false, data: action.payload };
    });
    builder.addCase(getHotelDetail.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error as AxiosError };
    });
  },
});

export default detailSlice.reducer;

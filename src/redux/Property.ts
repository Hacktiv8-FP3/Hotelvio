import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { httpClient } from '../services/api';
import { HotelData } from '../utils/types';
import { PropertiesItem } from '../utils/types/api';
import { Guest } from './guest';

const fetchCategoryId = (category: string) => {
  return httpClient
    .get('locations/v3/search', {
      params: {
        q: category,
        locale: 'en_GB',
        langid: '2057',
        siteid: '321200046',
      },
    })
    .then((res) => res.data.sr[0].gaiaId);
};

interface Date {
  day: number;
  month: number;
  year: number;
}

const fetchPropertybyCategory = (
  id: string,
  rooms: Guest[],
  checkInDate: Date,
  checkOutDate: Date
) => {
  return httpClient
    .post('properties/v2/list', {
      currency: 'IDR',
      eapid: 46,
      locale: 'en_GB',
      siteId: 321200046,
      destination: {
        regionId: id,
      },
      checkInDate,
      checkOutDate,
      rooms,
      resultsStartingIndex: 0,
      resultsSize: 10,
      sort: 'PRICE_RELEVANT',
    })
    .then((res) =>
      res.data.data.propertySearch.properties.map((item: PropertiesItem) => {
        const data = {
          name: item.name,
          id: item.id,
          price: item.price.lead.formatted,
          image: item.propertyImage.image.url,
        };
        return data;
      })
    );
};

export const getHotelByCategory = createAsyncThunk(
  'getHotelByCategory',
  async ({
    category,
    rooms,
    checkInDate,
    checkOutDate,
  }: {
    category: string;
    rooms: Guest[];
    checkInDate: Date;
    checkOutDate: Date;
  }) => {
    try {
      const res = fetchCategoryId(category).then((res) =>
        fetchPropertybyCategory(res, rooms, checkInDate, checkOutDate).then(
          (res) => res
        )
      );
      return res;
    } catch (err) {
      throw err;
    }
  }
);

type PropertyState = {
  loading: boolean;
  error?: AxiosError;
  data: HotelData[];
  selectedHotel?: HotelData;
};

const intialState = {
  data: [],
  loading: false,
} as PropertyState;

const propertySlice = createSlice({
  name: 'property',
  initialState: intialState,
  reducers: {
    setSelectedHotel: (state, action) => {
      state.selectedHotel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHotelByCategory.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getHotelByCategory.fulfilled, (state, action) => {
      return { ...state, loading: false, data: action.payload };
    });
    builder.addCase(getHotelByCategory.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error as AxiosError };
    });
  },
});

export const { setSelectedHotel } = propertySlice.actions;
export default propertySlice.reducer;

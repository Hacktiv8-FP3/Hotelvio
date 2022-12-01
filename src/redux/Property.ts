import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { httpClient } from '../services/api';

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
  adults: number,
  children: { age?: number }[],
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
      rooms: [
        {
          adults,
          children,
        },
      ],
      resultsStartingIndex: 0,
      resultsSize: 10,
      sort: 'PRICE_RELEVANT',
    })
    .then((res) =>
      res.data.data.propertySearch.properties.map((item: any) => {
        const data = {
          name: item.name,
          id: item.id,
          price: item.price.lead.amount,
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
    adults,
    children,
    checkInDate,
    checkOutDate,
  }: {
    category: string;
    adults: number;
    children: { age?: number }[];
    checkInDate: Date;
    checkOutDate: Date;
  }) => {
    try {
      const res = fetchCategoryId(category).then((res) =>
        fetchPropertybyCategory(
          res,
          adults,
          children,
          checkInDate,
          checkOutDate
        ).then((res) => res)
      );
      return res;
    } catch (err) {
      throw err;
    }
  }
);

const intialState = {
  data: [],
  loading: false,
};
const propertySlice = createSlice({
  name: 'property',
  initialState: intialState,
  reducers: {},
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

export default propertySlice.reducer;

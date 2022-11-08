import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

type ProductState = {
  products: number;
  loading: boolean;
  error?: AxiosError;
};

const initialState = {
  products: 0,
  loading: false,
} as ProductState;

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state) => {
      state.products += 1;
    },
    removeProduct: (state) => {
      state.products -= 1;
    },
  },
  //   extraReducers: builder => {
  //     builder.addCase(getAllProducts.pending, state => {
  //       return {...state, loading: true};
  //     });
  //     builder.addCase(getAllProducts.fulfilled, (state, action) => {
  //       const {data} = action.payload as {data: Products[]};
  //       return {...state, loading: false, products: data};
  //     });
  //     builder.addCase(getAllProducts.rejected, (state, action) => {
  //       return {...state, loading: false, error: action.error as AxiosError};
  //     });
  //   },
});

export const { addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;

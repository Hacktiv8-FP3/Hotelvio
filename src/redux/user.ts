import { createSlice } from '@reduxjs/toolkit';

const user = {
  email: 'user@gmail.com',
  password: 'user123',
  firstName: 'User',
  lastName: 'Hotelvio',
  phone: '081234567890',
  gender: true,
};

export interface InitState {
  isLogin: boolean;
  user?: typeof user;
}

const intialState = {
  isLogin: false,
  user: {},
} as InitState;

export const loginSlice = createSlice({
  name: 'Login',
  initialState: intialState,
  reducers: {
    login: (state, action) => {
      if (
        action.payload.email === user.email &&
        action.payload.password === user.password
      ) {
        state.isLogin = true;
        state.user = user;
      }
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = undefined;
    },
    editData: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, editData } = loginSlice.actions;
export default loginSlice.reducer;

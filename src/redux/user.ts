import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from './reducer';

export interface InitState {
  isLogin: boolean;
  user: any;
}
const user = {
  email: 'user@gmail.com',
  password: 'user123',
  firstName: 'User',
  lastName: 'Hotelvio',
  gender: true,
};
const intialState: InitState = {
  isLogin: false,
  user: user,
};

export const loginSlice = createSlice({
  name: 'Login',
  initialState: intialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = intialState.isLogin;
      state.user = intialState.user;
    },
    editData: (state, action) => {
      state.user = action.payload.user;
    },
  },
});
export const { login, logout, editData } = loginSlice.actions;
export default loginSlice.reducer;

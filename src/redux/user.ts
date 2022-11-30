import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from './reducer';

export interface InitState {
  isLogin: boolean;
  isLoading: boolean;
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
  isLoading: false,
  user: user,
};

export const loginSlice = createSlice({
  name: 'Login',
  initialState: intialState,
  reducers: {
    login: (state, action) => {
      state.isLoading = true;
      const { email, password } = action.payload;
      if (user.email === email && password === user.password) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
      state.isLoading = false;
    },
    logout: (state) => {
      state.isLoading = intialState.isLoading;
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

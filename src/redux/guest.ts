import { createSlice } from '@reduxjs/toolkit';

export type Guest = {
  adults: number;
  children: { age?: number }[];
};

export type GuestState = {
  guests: Guest;
  selectedChildIndex: number;
};

const intialState: GuestState = {
  guests: {
    adults: 1,
    children: [],
  },
  selectedChildIndex: 0,
};

const guestSlice = createSlice({
  name: 'guest',
  initialState: intialState,
  reducers: {
    addAdult: (state) => {
      state.guests.adults += 1;
    },
    removeAdult: (state) => {
      state.guests.adults -= 1;
    },
    addChild: (state) => {
      state.guests.children.push({ age: 0 });
    },
    removeChild: (state) => {
      state.guests.children.pop();
    },
    selectChild: (state, action) => {
      state.selectedChildIndex = action.payload;
    },
    updateChildAge: (state, action) => {
      state.guests.children[state.selectedChildIndex].age = action.payload;
    },
  },
});

export const {
  addAdult,
  removeAdult,
  addChild,
  removeChild,
  selectChild,
  updateChildAge,
} = guestSlice.actions;
export default guestSlice.reducer;

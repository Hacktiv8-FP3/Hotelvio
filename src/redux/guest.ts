import { createSlice } from '@reduxjs/toolkit';

export type Guest = {
  adults: number;
  children: { age?: number }[];
};

export type GuestState = {
  checkIn?: Date;
  checkOut?: Date;
  rooms: Guest[];
  selectedChildIndex: number;
};

const intialState = {
  rooms: [
    {
      adults: 1,
      children: [],
    },
  ],
  selectedChildIndex: 0,
} as GuestState;

const guestSlice = createSlice({
  name: 'guest',
  initialState: intialState,
  reducers: {
    addRoom: (state) => {
      state.rooms.push({
        adults: 1,
        children: [],
      });
    },
    removeRoom: (state) => {
      state.rooms.pop();
    },
    addAdult: (state) => {
      state.rooms[state.rooms.length - 1] = {
        ...state.rooms[state.rooms.length - 1],
        adults: state.rooms[state.rooms.length - 1].adults + 1,
      };
    },
    removeAdult: (state) => {
      if (state.rooms[state.rooms.length - 1].adults > 0) {
        state.rooms[state.rooms.length - 1] = {
          ...state.rooms[state.rooms.length - 1],
          adults: state.rooms[state.rooms.length - 1].adults - 1,
        };
      }
    },
    addChild: (state) => {
      state.rooms[state.rooms.length - 1] = {
        ...state.rooms[state.rooms.length - 1],
        children: [...state.rooms[state.rooms.length - 1].children, { age: 0 }],
      };
    },
    removeChild: (state) => {
      if (state.rooms[state.rooms.length - 1].children.length > 0) {
        state.rooms[state.rooms.length - 1] = {
          ...state.rooms[state.rooms.length - 1],
          children: state.rooms[state.rooms.length - 1].children.slice(0, -1),
        };
      }
    },
    selectChild: (state, action) => {
      state.selectedChildIndex = action.payload;
    },
    updateChildAge: (state, action) => {
      state.rooms[state.rooms.length - 1].children[
        state.selectedChildIndex
      ].age = action.payload;
    },
    setCheckIn: (state, action) => {
      state.checkIn = action.payload as Date;
    },
    setCheckOut: (state, action) => {
      state.checkOut = action.payload as Date;
    },
  },
});

export const {
  addRoom,
  removeRoom,
  addAdult,
  removeAdult,
  addChild,
  removeChild,
  selectChild,
  updateChildAge,
  setCheckIn,
  setCheckOut,
} = guestSlice.actions;
export default guestSlice.reducer;

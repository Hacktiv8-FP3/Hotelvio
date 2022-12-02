import { createSlice } from '@reduxjs/toolkit';

import { History } from '../utils/types';

interface HistoryState {
  histories: History[];
}

const intialState: HistoryState = {
  histories: [],
};

const historySlice = createSlice({
  name: 'favorites',
  initialState: intialState,
  reducers: {
    addHistory: (state, action) => {
      state.histories.unshift(action.payload);
    },
  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;

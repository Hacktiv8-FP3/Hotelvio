import { createSlice } from '@reduxjs/toolkit';

interface historyState {
  histories: any[];
}
const intialState: historyState = {
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

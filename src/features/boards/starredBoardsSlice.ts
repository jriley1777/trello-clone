import { createSlice } from "@reduxjs/toolkit";

const initialStarredBoards: string[] = [];

const starred = createSlice({
  name: "starred",
  initialState: initialStarredBoards,
  reducers: {
    setStarredBoards(state, action) {
      const starred: string[] = action.payload;
      return starred;
    },
    clearSttarredBoards(state) {
      return initialStarredBoards;
    },
  },
});

export const { setStarredBoards, clearSttarredBoards } = starred.actions;

export default starred.reducer;

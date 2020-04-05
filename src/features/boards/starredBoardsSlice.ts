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
    clearStarredBoards(state) {
      return initialStarredBoards;
    },
  },
});

export const { setStarredBoards, clearStarredBoards  } = starred.actions;

export default starred.reducer;

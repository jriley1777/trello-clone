import { createSlice } from "@reduxjs/toolkit";

type BoardStarsType = string[];

const initialBoards: BoardStarsType = [];

const boardStars = createSlice({
  name: "boardStars",
  initialState: initialBoards,
  reducers: {
    setBoardStars(state, action) {
      const ids: BoardStarsType = action.payload;
      return ids;
    },
    deleteBoardStar(state, action) {
      const id: string = action.payload;
      return state.filter(star => star === id);
    },
    clearBoardStars(state) {
      return initialBoards;
    },
  },
});

export const {
         setBoardStars,
         clearBoardStars,
         deleteBoardStar,
       } = boardStars.actions;

export default boardStars.reducer;

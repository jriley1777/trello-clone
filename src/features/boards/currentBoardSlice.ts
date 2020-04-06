import { createSlice } from "@reduxjs/toolkit";

const initial = '';

const currentBoard = createSlice({
  name: "currentBoard",
  initialState: initial,
  reducers: {
    setCurrentBoard(state, action) {
      const boardId: string = action.payload;
      return boardId;
    },
    clearCurrentBoard(state) {
      return initial;
    }
  },
});

export const { setCurrentBoard, clearCurrentBoard } = currentBoard.actions;

export default currentBoard.reducer;

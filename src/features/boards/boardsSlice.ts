import { createSlice } from "@reduxjs/toolkit";
import { Board } from '../../models/index.models';

const initialBoards: Board[] = [];

const boards = createSlice({
  name: "boards",
  initialState: initialBoards,
  reducers: {
    setBoards(state, action) {
      const boards: Board[] = action.payload;
      return boards;
    },
    clearBoards(state){
      return initialBoards;
    },
    updateBoard(state, action) {
      const updatedBoard: Board = action.payload;
      return [
        ...state,
        updatedBoard
      ]
    }
  }
});

export const { setBoards, clearBoards, updateBoard } = boards.actions;

export default boards.reducer;

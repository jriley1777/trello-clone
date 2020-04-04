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
    }
  }
});

export const { setBoards, clearBoards } = boards.actions;

export default boards.reducer;

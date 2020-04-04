import { createSlice } from "@reduxjs/toolkit";
import { Board } from '../models/index.models';


const initialBoards: Board[] = [];

const boards = createSlice({
  name: "boards",
  initialState: {
    boards: initialBoards
  },
  reducers: {
    setBoards(state, action) {
      const boards: Board[] = action.payload;
      return (state = {
        boards
      });
    },
    clearBoards(state){
      return (state = { 
        boards: initialBoards 
      });
    }
  }
});

export const { setBoards, clearBoards } = boards.actions;

export default boards.reducer;

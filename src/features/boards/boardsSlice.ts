import { createSlice } from "@reduxjs/toolkit";
import { Board } from '../../models/index.models';

type BoardsType = {
  byId?: any,
  allIds?: any
}

const initialBoards: any = {};

const boards = createSlice({
  name: "boards",
  initialState: initialBoards,
  reducers: {
    setBoards(state, action) {
      const { byId, allIds }: BoardsType = action.payload;
      return {
        byId,
        allIds,
      };
    },
    clearBoards(state){
      return initialBoards;
    }
  }
});

export const { setBoards, clearBoards } = boards.actions;

export default boards.reducer;

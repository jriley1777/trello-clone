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
    starBoard(state, action) {
      const id: Board['id'] = action.payload;
      const updatedBoard: Board = state.find(board => board.id === id)!;
      return [
        ...state,
        {
          ...updatedBoard,
          starred: false
        }
      ] 
    },
    unstarBoard(state, action) {
      const id: Board['id'] = action.payload;
      const updatedBoard: Board = state.find(board => board.id === id)!;
      return [
        ...state,
        {
          ...updatedBoard,
          starred: false
        }
      ]
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

export const { setBoards, clearBoards, updateBoard, starBoard, unstarBoard } = boards.actions;

export default boards.reducer;

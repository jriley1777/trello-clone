import { createSlice } from "@reduxjs/toolkit";
import { Board } from '../models/index.models';
import { DEFAULT_BOARD_COLOR } from '../constants/index';


const initialBoards: Board[] = [
  {
    name: "Test",
    boardId: "123",
    bg: {
      color: "",
      media: {
        url:
          "https://images.unsplash.com/photo-1443527216320-7e744084f5a7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyNDgxN30",
        alt: "sea-waves"
      }
    }
  },
  {
    name: "Board Default",
    boardId: "222",
    bg: {
      color: DEFAULT_BOARD_COLOR,
      media: {}
    }
  },
  {
    name: "Board w Custom Color",
    boardId: "333",
    bg: {
      color: "#ff1092",
      media: {}
    }
  }
];

const boards = createSlice({
  name: "boards",
  initialState: {
    boards: initialBoards
  },
  reducers: {
    addBoards(state, action) {
      const boards : Board[] = action.payload;
      return (state = {
        boards
      });
    },
  }
});

export const { addBoards } = boards.actions;

export default boards.reducer;

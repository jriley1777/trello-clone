import { combineReducers } from "redux";
import auth from "../features/auth/authSlice";
import boards from '../features/boards/boardsSlice';
import currentLists from '../features/lists/listSlice';
import currentBoard from '../features/boards/currentBoardSlice';

const boardReducer = combineReducers({
  boards,
  currentLists,
  currentBoard
})

export default combineReducers({
  auth,
  boards: boardReducer
});

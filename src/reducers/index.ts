import { combineReducers } from "redux";
import auth from "../features/auth/authSlice";
import boards from '../features/boards/boardsSlice';
import starred from '../features/boards/starredBoardsSlice';
import currentLists from '../features/lists/listSlice';
import currentBoard from '../features/boards/currentBoardSlice';

const boardReducer = combineReducers({
  boards,
  starred,
  currentLists,
  currentBoard
})

export default combineReducers({
  auth,
  boards: boardReducer
});

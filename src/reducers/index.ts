import { combineReducers } from "redux";
import auth from "../features/auth/authSlice";
import boards from '../features/boards/boardsSlice';
import starred from '../features/boards/starredBoardsSlice';

const boardReducer = combineReducers({
  boards,
  starred
})

export default combineReducers({
  auth,
  boards: boardReducer
});

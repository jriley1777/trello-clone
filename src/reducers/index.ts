import { combineReducers } from "redux";
import auth from "../features/auth/authSlice";
import boards from '../features/boardsSlice';

export default combineReducers({
  auth,
  boards
});

import { combineReducers } from "redux";
import auth from "../features/auth/authSlice";
import boards from '../features/boards/boardsSlice';
import stars from "../features/boards/starsSlice";
import currentBoard from "../features/boards/currentBoardSlice";
import lists from '../features/lists/listSlice';
import cards from '../features/lists/cardsSlice';
import cardItems from '../features/lists/cardItemsSlice';

const boardReducer = combineReducers({
  boards,
  lists,
  cards,
  cardItems,
  stars,
  currentBoard
})

export default combineReducers({
  auth,
  boards: boardReducer
});

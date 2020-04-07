import { RootState } from '../utils/redux';

export const isAuthenticated = (state: RootState) => state.auth.isLoggedIn;
export const getCurrentUser = (state: RootState) => state.auth.user;

export const getBoards = (state: RootState) => state.boards.boards;
export const getStarredBoards = (state: RootState) => state.boards.boards.filter(board => board.isStarred === true);
export const getLists = (state: RootState) => {
    if (state.boards.currentLists.hasOwnProperty("byId")) {
      return Object.entries(state.boards.currentLists.byId).map(([key, value]: any) => {
          return { id: key, ...value}
      });
    } else {
      return [];
    }
}
export const getListById = (id: string) => (state: RootState) => state.boards.currentLists.byId(id);
export const getCurrentBoard = (state: RootState) => state.boards.currentBoard;
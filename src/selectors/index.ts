import { RootState } from '../utils/redux';

export const isAuthenticated = (state: RootState) => state.auth.isLoggedIn;
export const getCurrentUser = (state: RootState) => state.auth.user;

export const getBoards = (state: RootState) => state.boards.boards;
export const getStarredBoards = (state: RootState) => state.boards.starred;
export const getCurrentLists = (state: RootState) => state.boards.currentLists;
export const getCurrentBoard = (state: RootState) => state.boards.currentBoard;
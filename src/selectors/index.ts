import { RootState } from '../utils/redux';

export const isAuthenticated = (state: RootState) => state.auth.isLoggedIn;
export const getCurrentUser = (state: RootState) => state.auth.user;

export const getBoards = (state: RootState) => state.boards.boards;
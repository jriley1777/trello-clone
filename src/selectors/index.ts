import { RootState } from '../utils/redux';

export const isAuthenticated = (state: RootState) => state.auth.isLoggedIn;
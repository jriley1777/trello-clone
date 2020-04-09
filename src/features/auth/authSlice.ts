import { createSlice } from "@reduxjs/toolkit";
import { User } from '../../models/index.models';

const initialUser: User = {
  id: '',
  email: '',
  name: '',
  photoURL: ''
}

const auth = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    isLoggedIn: false
  },
  reducers: {
    setUser(state, action) {
      const { user }: { user: User } = action.payload;
      return (state = {
        user,
        isLoggedIn: true
      });
    },
    clearUser(state) {
      return (state = {
        user: initialUser,
        isLoggedIn: false
      });
    }
  }
});

export const { setUser, clearUser } = auth.actions;

export default auth.reducer;

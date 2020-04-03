import { createSlice } from "@reduxjs/toolkit";

interface User {
    email: string,
    displayName: string,
    photoURL?: string,
    uid: string
};

const initialUser: User= {
  email: '',
  displayName: '',
  photoURL: '',
  uid: ''
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

import { createSlice } from "@reduxjs/toolkit";

interface User {
  user : {
    email: string,
    displayName: string,
    photoURL?: string,
    uid: string
  }
};


const auth = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoggedIn: false
  },
  reducers: {
    setUser(state, action) {
      const { user }: User = action.payload;
      return state = { 
        user,
        isLoggedIn: true
      };
    },
    clearUser(state) {
      return state = { 
        user: "",
        isLoggedIn: false
      };
    }
  }
});

export const { setUser, clearUser } = auth.actions;

export default auth.reducer;

import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    setAuth(state, action) {
      const { auth } = action.payload;
      return (state = { auth });
    },
    clearAuth(state) {
      return (state = { auth: "" });
    }
  }
});

export const { setAuth, clearAuth } = auth.actions;

export default auth.reducer;

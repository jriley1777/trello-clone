import { createSlice } from "@reduxjs/toolkit";

const initialLists: any[] = [];

const lists = createSlice({
  name: "lists",
  initialState: initialLists,
  reducers: {
    setCurrentLists(state, action) {
      const lists: any[] = action.payload;
      return lists;
    },
    clearCurrentLists(state) {
      return initialLists;
    },
  },
});

export const { setCurrentLists, clearCurrentLists } = lists.actions;

export default lists.reducer;

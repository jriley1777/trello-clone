import { createSlice } from "@reduxjs/toolkit";
import { List } from '../../models/index.models';

interface ListsType {
  byId?: any,
  allIds?: any
}

const initialLists: ListsType = {};

const lists = createSlice({
  name: "lists",
  initialState: initialLists,
  reducers: {
    setLists(state, action) {
      const { byId, allIds } : ListsType = action.payload;
      return {
        byId,
        allIds
      };
    },
    clearLists(state) {
      return initialLists;
    },
  },
});

export const { setLists, clearLists } = lists.actions;

export default lists.reducer;

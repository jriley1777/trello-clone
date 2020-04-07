import { createSlice } from "@reduxjs/toolkit";
import { List } from '../../models/index.models';

interface ListsType {
  byId?: any,
  allIds?: any
}

const initialLists: any = {};

const lists = createSlice({
  name: "lists",
  initialState: initialLists,
  reducers: {
    setCurrentLists(state, action) {
      const { byId, allIds } : ListsType = action.payload;
      return {
        byId,
        allIds
      };
    },
    clearCurrentLists(state) {
      return initialLists;
    },
  },
});

export const { setCurrentLists, clearCurrentLists } = lists.actions;

export default lists.reducer;

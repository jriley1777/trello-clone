import { createSlice } from "@reduxjs/toolkit";
import { CardItem } from "../../models/index.models";

interface CardItemType {
  byId?: any;
  allIds?: any;
}

const initialCards: CardItemType = {};

const cardItems = createSlice({
  name: "cardItems",
  initialState: initialCards,
  reducers: {
    setCardItems(state, action) {
      const { byId, allIds }: CardItemType = action.payload;
      return {
        byId,
        allIds,
      };
    },
    clearCardItems(state) {
      return initialCards;
    },
  },
});

export const { setCardItems, clearCardItems } = cardItems.actions;

export default cardItems.reducer;

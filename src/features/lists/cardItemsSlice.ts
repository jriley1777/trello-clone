import { createSlice } from "@reduxjs/toolkit";
// import { CardItem } from "../../models/index.models";

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
      return {
        ...state,
        ...action.payload
      };
    },
    clearCardItemsById(state, action) {
      const cardId = action.payload;
      const updatedState: any = {...state};
      delete updatedState[cardId];
      return updatedState;
    },
    clearCardItems() {
      return initialCards
    }
  },
});

export const { setCardItems, clearCardItems } = cardItems.actions;

export default cardItems.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../../models/index.models";

interface CardsType {
  byId?: any;
  allIds?: any;
}

const initialCards: CardsType = {};

const cards = createSlice({
  name: "cards",
  initialState: initialCards,
  reducers: {
    setCards(state, action) {
      const { byId, allIds }: CardsType = action.payload;
      return {
        byId,
        allIds,
      };
    },
    clearCards(state) {
      return initialCards;
    },
  },
});

export const { setCards, clearCards } = cards.actions;

export default cards.reducer;

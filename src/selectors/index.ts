import { RootState } from '../utils/redux';
import { createSelector } from '@reduxjs/toolkit';
import * as Types from '../models/index.models';

export const isAuthenticated = (state: RootState) => state.auth.isLoggedIn;
export const getCurrentUser = (state: RootState) => state.auth.user;

export const getBoards = (state: RootState): Types.Board[] => {
  if (state.boards.boards.hasOwnProperty("allIds")) {
    return state.boards.boards.allIds.map(
      (id: string) => state.boards.boards.byId[id]
    );
  } else {
    return [];
  }
};
export const getStarredBoards = (state: RootState): Types.Board[] => {
  let stars: Types.Board[] = [];
  state.boards.stars.forEach(id => {
    if(state.boards.boards.byId[id]){
      stars.push(state.boards.boards.byId[id]);
    }
  });
  return stars;
}
export const isBoardStarred = createSelector(
  (state: any) => state.boards.stars,
  (_: any, boardId: string) => boardId,
  (stars, boardId) => stars.includes(boardId),
)
export const getLists = (state: RootState) => {
    if (state.boards.lists.hasOwnProperty("byId")) {
      return state.boards.lists.allIds.map(
        (id: string) => state.boards.lists.byId[id]
      );
    } else {
      return [];
    }
};
export const getCards = (state: RootState) => {
  if (state.boards.cards.hasOwnProperty("byId")) {
    return state.boards.cards.allIds.map(
      (id: string) => state.boards.cards.byId[id]
    );
  } else {
    return [];
  }
};
export const getCardsByList = createSelector(
  (state: any) => state.boards.cards,
  (_: any, listId: string) => listId,
  (cards, listId) => {
    if(cards.hasOwnProperty("byId")){
      let filteredCards: Types.Card[] = [];
      Object.entries(cards.byId).forEach(([key, value]: [string, any]) => {
        if (value.list === listId) {
          filteredCards.push(value);
        }
      });
      return filteredCards; 
    } else {
      return [];
    }
  }
);
export const getCardItemsByCard = createSelector(
  (state: any) => state.boards.cardItems,
  (_: any, cardId: string) => cardId,
  (cardItems, cardId) => {
    if (cardItems && cardItems[cardId]) {
      return cardItems[cardId].allIds.map(
        (id: string) => cardItems[cardId].byId[id]
      );
    } else {
      return [];
    }
  }
);

export const getBoardById = (id: string) => (state: RootState) =>
  state.boards.boards.byId(id);
export const getListById = (id: string) => (state: RootState) => state.boards.lists.byId(id);
export const getCurrentBoard = (state: RootState) => state.boards.currentBoard;
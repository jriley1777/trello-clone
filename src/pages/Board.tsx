import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase, { DB_REFS } from '../utils/firebase';

import GridList from '@material-ui/core/GridList';
import AppHeader from '../components/AppHeader/AppHeader';
import BoardHeader from '../components/BoardHeader/BoardHeader';
import CreateItemButton from '../components/CreateItemButton/CreateItemButton';
import BoardList from '../components/BoardList/BoardList';

import * as Selectors from '../selectors/index';
import { setLists, clearLists } from '../features/lists/listSlice';
import { setCards, clearCards } from '../features/lists/cardsSlice';
import { setCurrentBoard } from '../features/boards/currentBoardSlice';
import { Board as BoardType } from '../models/index.models';

const PageWrapper = styled.div<{ bg: any }>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${props =>
  props.bg.media.urls ? `url(${props.bg.media.urls.regular})` : `${props.bg.color}`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledAttribution = styled.div`
    position: absolute;
    bottom: 8px;
    left: 8px;
    color: white;
    font-weight: bold;
    z-index: 0;
    & a {
      text-decoration: none;
      color: #ded;
      &:hover {
        color: gold;
      }
    }
`;


const Board = () => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const currentUser = useSelector(Selectors.getCurrentUser);
    const boards = useSelector(Selectors.getBoards);
    const board = boards.find(board => board.id === boardId!)!; //TODO: selector memoization
    document.title = `${board.name} | Taskboard`;
    const boardsRef = DB_REFS.boards;
    const listsRef = DB_REFS.lists;
    const cardsRef = DB_REFS.cards;
    const currentLists = useSelector(Selectors.getLists);

    const setBoardAccessTime = useCallback((board) => {
      let updatedBoard = {
        ...board,
        lastAccessTime: firebase.database.ServerValue.TIMESTAMP
      }
      boardsRef.child(currentUser.id).child(board.id!).set(updatedBoard); 
    }, [boardsRef, currentUser.id]);

    const addListsListener = useCallback((board) => {
      listsRef.child(board.id!).on('value', snap => {
        if (snap.val()) {
          let allIds = Object.keys(snap.val());
          let byId: any = {};
          allIds.forEach(id => {
            byId[id] = snap.val()[id];
            byId[id].id = id;
          })
          let loaded: any = { byId, allIds };
          dispatch(setLists(loaded));
        } else {
          dispatch(clearLists());
        }
      }); 
    }, [listsRef, dispatch]);

    const addCardsListener = useCallback((board) => {
      cardsRef.child(board.id!).on('value', snap => {
        if (snap.val()) {
          let allIds = Object.keys(snap.val());
          let byId: any = {};
          allIds.forEach(id => {
            byId[id] = snap.val()[id];
            byId[id].id = id;
          })
          let loaded: any = { byId, allIds };
          dispatch(setCards(loaded));
        } else {
          dispatch(clearCards())
        }
      })
    }, [cardsRef, dispatch]);

    const updateCurrentBoard = useCallback((board) => {
      dispatch(setCurrentBoard(board.id));
    }, [dispatch])

    useEffect(() => {
      setBoardAccessTime(board);
      updateCurrentBoard(board);
      addCardsListener(board);
      addListsListener(board);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ setBoardAccessTime, updateCurrentBoard, addCardsListener, addListsListener ])

    const renderUnsplashCredit = (board: BoardType) => {
      if(board!.bg.media){
        let { name, links } = board.bg.media.user;
        return (
          <StyledAttribution>
            <span>Photo by <a href={links.html} target="_">{ name }</a> on <a href="https://unsplash.com" target="_">Unsplash</a></span>
          </StyledAttribution>
        )
      }
    }

    const renderBoardLists = (lists: any[]) => {
      return lists.map(list => (
        <BoardList key={list.id} list={list} />
      ))
    }

    const handleListCreate = (list: {list: string}) => {
      listsRef.child(board.id!).push().set({
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        lastUpdatedAt: firebase.database.ServerValue.TIMESTAMP,
        createdBy: currentUser.id,
        name: list.list
      });
    }
    
    return (
      <PageWrapper bg={board!.bg}>
        <AppHeader background={!!board!.bg.media} />
        <BoardHeader board={board!} />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            overflow: 'hidden',
            height: '100%',
            padding: '8px'
          }}>
          <GridList 
            cols={5.5}
            style={{
              flexWrap: 'nowrap',
              transform: 'translateZ(0)',
            }}
            >
            {renderBoardLists(currentLists)}
            <CreateItemButton
              stayActive
              name="list"
              onSubmit={handleListCreate}
              buttonText='Add a list'
              actionText='Add list'
            />
          </GridList> 
        </div>
        { renderUnsplashCredit(board) }
      </PageWrapper>
    );
};

export default Board;
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../utils/firebase';

import GridList from '@material-ui/core/GridList';
import AppHeader from '../components/AppHeader/AppHeader';
import BoardHeader from '../components/BoardHeader/BoardHeader';
import CreateItemButton from '../components/CreateItemButton/CreateItemButton';
import BoardList from '../components/BoardList/BoardList';

import * as Selectors from '../selectors/index';
import { setCurrentLists, clearCurrentLists } from '../features/lists/listSlice';
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
    const boards = useSelector(Selectors.getBoards);
    const currentUser = useSelector(Selectors.getCurrentUser);
    const board = boards.find(x => x.id === boardId)!;
    document.title = `${board.name} | Taskboard`;
    const boardsRef = firebase.database().ref('boards');
    const listsRef = firebase.database().ref('lists');
    const currentLists = useSelector(Selectors.getLists);

    useEffect(() => {
      dispatch(setCurrentBoard(boardId));
      let updatedBoard = {
        ...board,
        lastAccessTime: firebase.database.ServerValue.TIMESTAMP
      }
      boardsRef.child(currentUser.id).child(boardId!).set(updatedBoard);
      listsRef.child(boardId!).on('value', snap => {
        if(snap.val()){
          let loadedLists: any = { byId: snap.val() };
          loadedLists.allIds = Object.keys(snap.val());
          dispatch(setCurrentLists(loadedLists));
        }
      })
      return () => {
        listsRef.child(boardId!).off('value');
        dispatch(clearCurrentLists());
      }
    }, [])

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
      listsRef.child(boardId!).push().set({
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
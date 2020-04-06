import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../utils/firebase';

import Grid from '@material-ui/core/Grid';
import AppHeader from '../components/AppHeader/AppHeader';
import BoardHeader from '../components/BoardHeader/BoardHeader';
import CreateListButton from '../components/CreateListButton/CreateListButton';
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
    bottom: 20px;
    left: 20px;
    color: white;
    & a {
      text-decoration: none;
      color: #ded;
      &:hover {
        color: gold;
      }
    }
`;

const Board = () => {
    document.title = "BoardName | Taskboard";
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const boards = useSelector(Selectors.getBoards);
    const currentUser = useSelector(Selectors.getCurrentUser);
    const board = boards.find(x => x.boardId === boardId)!;
    const boardsRef = firebase.database().ref('boards');
    const listsRef = firebase.database().ref('lists');
    const currentLists = useSelector(Selectors.getCurrentLists);

    useEffect(() => {
      dispatch(setCurrentBoard(boardId));
      let updatedBoard = {
        ...board,
        lastAccessTime: firebase.database.ServerValue.TIMESTAMP
      }
      boardsRef.child(currentUser.uid).child(boardId!).set(updatedBoard);
      listsRef.child(boardId!).on('value', snap => {
        if(snap.val()){
          const loadedLists: any = [];
          Object.entries(snap.val()).forEach(([key, value]: [string, any]) => {
            loadedLists.push({
              listId: key,
              name: value.name 
            })
          });
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
        <Grid item key={list.listId}>
            <BoardList list={list} />
        </Grid>
      ))
    }
    
    return (
      <PageWrapper bg={board!.bg}>
        <AppHeader background={!!board!.bg.media} />
        <BoardHeader board={board!} />
        <Grid 
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          style={{ padding: '8px' }}
          >
          {renderBoardLists(currentLists)}
          <Grid item>
            <CreateListButton boardId={boardId!} />
          </Grid>
        </Grid>
        { renderUnsplashCredit(board) }
      </PageWrapper>
    );
};

export default Board;
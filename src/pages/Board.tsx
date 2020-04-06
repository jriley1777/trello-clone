import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../utils/firebase';

import Grid from '@material-ui/core/Grid';
import Placeholder from '../components/Placeholder/Placeholder';
import AppHeader from '../components/AppHeader/AppHeader';
import BoardHeader from '../components/BoardHeader/BoardHeader';

import * as Selectors from '../selectors/index';
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
    const { boardId } = useParams();
    const boards = useSelector(Selectors.getBoards);
    const currentUser = useSelector(Selectors.getCurrentUser);
    const board = boards.find(x => x.boardId === boardId)!;
    const boardsRef = firebase.database().ref('boards');

    useEffect(() => {
      let updatedBoard = {
        ...board,
        lastAccessTime: firebase.database.ServerValue.TIMESTAMP
      }
      boardsRef.child(currentUser.uid).child(board!.boardId).set(updatedBoard)
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
    
    return (
      <PageWrapper bg={board!.bg}>
        <AppHeader background={!!board!.bg.media} />
        <BoardHeader board={board!} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={3}
          style={{ padding: "3rem 20px 0 20px" }}
        >
          <Grid item xs={2}>
            <Placeholder height={"40vh"} />
          </Grid>
          <Grid item xs={2}>
            <Placeholder height={"40vh"} />
          </Grid>
          <Grid item xs={2}>
            <Placeholder height={"40vh"} />
          </Grid>
          <Grid item xs={2}>
            <Placeholder height={"40vh"} />
          </Grid>
        </Grid>
        { renderUnsplashCredit(board) }
      </PageWrapper>
    );
};

export default Board;
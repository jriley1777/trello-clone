import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../utils/firebase';

import Grid from '@material-ui/core/Grid';
import Placeholder from '../components/Placeholder/Placeholder';
import AppHeader from '../components/AppHeader/AppHeader';
import BoardHeader from '../components/BoardHeader/BoardHeader';

import * as Selectors from '../selectors/index';

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


const Board = () => {
    document.title = "BoardName | Taskboagrd";
    const { boardId } = useParams();
    const boards = useSelector(Selectors.getBoards);
    const board = boards.find(x => x.boardId === boardId);
    
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
      </PageWrapper>
    );
};

export default Board;
import React, { useEffect } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../utils/firebase';
import Grid from '@material-ui/core/Grid';
import PersonIcon from "@material-ui/icons/PersonOutline";
import RecentlyViewedIcon from "@material-ui/icons/AccessTimeOutlined";
import MenuIcon from "@material-ui/icons/List";

import BoardCardList from '../components/BoardCardList/BoardCardList';
import Placeholder from '../components/Placeholder/Placeholder';
import AppHeader from '../components/AppHeader/AppHeader';
import * as Selectors from '../selectors/index';
import { Board } from '../models/index.models';
import { setBoards } from '../features/boardsSlice';

const PageWrapper = styled.div.attrs({
  className: "PageWrapper"
})`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgb(250,251,252);
  color: black;
`;

const UserHome: React.FC = () => {
  document.title = "Boards | Taskboard";
  const dispatch = useDispatch();
  const boards = useSelector(Selectors.getBoards);
  const currentUser = useSelector(Selectors.getCurrentUser);
  const boardsRef = firebase.database().ref("boards");
  useEffect(() => {
    boardsRef.child(currentUser.uid).on('value', snap => {
      const loadedBoards: Board[] = [];
      if(snap.val()){
        console.log(snap.val());
        Object.entries(snap.val()).forEach(([key, value]: [string, any]) => {
          loadedBoards.push({
            boardId: key,
            name: value.name,
            bg: {
              color: value.bg.color,
              media: value.bg.media || {}
            }
          })
        });
        dispatch(setBoards(loadedBoards));

      }
    });
  }, []);
  console.log(boards)
  return (
    <PageWrapper>
      <AppHeader />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={6}
        style={{ paddingTop: "4.5rem" }}
      >
        <Grid item sm={2}>
          <Grid item>
            <h4>
              <MenuIcon
                style={{ position: "relative", top: "6px", right: "3px" }}
              />
              Menu
            </h4>
          </Grid>
          <Grid item>
            <Placeholder height={"40vh"} />
          </Grid>
        </Grid>
        <Grid
          sm={7}
          item
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item>
            <h4>
              <RecentlyViewedIcon
                style={{ position: "relative", top: "5px", right: "3px" }}
              />
              Recently Viewed
            </h4>
          </Grid>
          <Grid item>
            <Placeholder height={"15vh"} width={"55vw"} />
          </Grid>
          <Grid item>
            <h4>
              <PersonIcon
                style={{ position: "relative", top: "5px", right: "3px" }}
              />
              Personal Boards
            </h4>
          </Grid>
          <Grid item>
            <BoardCardList boards={boards} />
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default UserHome;
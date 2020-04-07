import React from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PersonIcon from "@material-ui/icons/PersonOutline";
import RecentIcon from '@material-ui/icons/AccessTime';
import MenuIcon from "@material-ui/icons/List";
import StarIcon from '@material-ui/icons/StarBorderRounded';
import Hidden from '@material-ui/core/Hidden';

import CreateBoardCard from '../components/CreateBoardButton/CreateBoardButton';
import BoardTileList from '../components/BoardTileList/BoardTileList';
import Placeholder from '../components/Placeholder/Placeholder';
import AppHeader from '../components/AppHeader/AppHeader';
import * as Selectors from '../selectors/index';

const PageWrapper = styled.div.attrs({
  className: "PageWrapper"
})`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background: rgb(250,251,252);
  color: black;
`;

const UserHome: React.FC = () => {
  document.title = "Boards | Taskboard";
  const boards = useSelector(Selectors.getBoards);
  const starredBoards = useSelector(Selectors.getStarredBoards);
  const accessedBoards = boards.filter(board => {
    return board.lastAccessTime && (new Date().getTime() - board.lastAccessTime) < 3600000;
  });
  const recentBoards = accessedBoards.length > 0 ? 
    accessedBoards.sort((a, b) =>  b.lastAccessTime! > a.lastAccessTime! ? 1 : -1).slice(0, 4) :
  [];

  const renderRecentItems = (recentItems: any) => {
    return recentItems.length > 0 ? (
      <>
        <Grid item>
          <h4>
            <RecentIcon
              style={{ position: "relative", top: "5px", right: "3px" }}
            />
            Recent Items
          </h4>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <BoardTileList boards={recentItems} />
          </Grid>
        </Grid>
      </>
    ) : null;
  }

  const renderStarredItems = (starredItems: any) => {
    return starredItems.length > 0 ? (
      <>
        <Grid item>
          <h4>
            <StarIcon
              style={{ position: "relative", top: "5px", right: "3px" }}
            />
                Starred
              </h4>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <BoardTileList boards={starredItems} />
          </Grid>
        </Grid>
      </>
    ) : null;
  }
  
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
        <Hidden smDown>
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
        </Hidden>
        <Grid
          xs={10}
          sm={8}
          item
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          { renderRecentItems(recentBoards) }
          { renderStarredItems(starredBoards) }
          <Grid item>
            <h4>
              <PersonIcon
                style={{ position: "relative", top: "5px", right: "3px" }}
              />
              Personal Boards
            </h4>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <BoardTileList boards={boards} />
              <Grid item>
                <CreateBoardCard />
              </Grid> 
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default UserHome;
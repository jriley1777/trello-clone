import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import PersonIcon from "@material-ui/icons/PersonOutline";
import RecentlyViewedIcon from "@material-ui/icons/AccessTimeOutlined";
import MenuIcon from "@material-ui/icons/List";

import BoardCardList from '../components/BoardCardList/BoardCardList';
import Placeholder from '../components/Placeholder/Placeholder';
import AppHeader from '../components/AppHeader/AppHeader';

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

  const boards = [
    {
      name: "Test",
      boardId: "123",
      media: {
        url: "https://images.unsplash.com/photo-1443527216320-7e744084f5a7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyNDgxN30",
        alt: "sea-waves"
      }
    },
    { name: "Board 2", boardId: "345" },
    { name: "myBoard", boardId: "546" },
    { name: "ABOARD@214", boardId: "535" }
  ];

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
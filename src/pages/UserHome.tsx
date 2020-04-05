import React from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PersonIcon from "@material-ui/icons/PersonOutline";
import MenuIcon from "@material-ui/icons/List";
import StarIcon from '@material-ui/icons/StarBorderRounded';

import CreateBoardCard from '../components/CreateCard/CreateCard';
import BoardCardList from '../components/BoardCardList/BoardCardList';
import Placeholder from '../components/Placeholder/Placeholder';
import AppHeader from '../components/AppHeader/AppHeader';
import * as Selectors from '../selectors/index';

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
  const boards = useSelector(Selectors.getBoards);
  const starredItems: any = useSelector(Selectors.getStarredBoards);

  const renderStarredItems = (starredItems: any) => {
    const starredBoards = boards.filter(x => starredItems.includes(x.boardId))
    return starredBoards.length > 0 ? (
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
          <Grid container direction="row" spacing={1}>
            <BoardCardList boards={starredBoards} />
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
          {renderStarredItems(starredItems) }
          <Grid item>
            <h4>
              <PersonIcon
                style={{ position: "relative", top: "5px", right: "3px" }}
              />
              Personal Boards
            </h4>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <BoardCardList boards={boards} />
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
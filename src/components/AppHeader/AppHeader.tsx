import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from '../../utils/firebase';
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import DnsIcon from "@material-ui/icons/Dns";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/HomeTwoTone";
import Card from '@material-ui/core/Card';
import { clearUser } from '../../features/auth/authSlice';

import * as Constants from "../../constants/index";
import * as Selectors from "../../selectors/index";

const StyledHeader = styled.div.attrs({
  className: "header"
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: rgb(250, 251, 252);
  background: rgb(0, 120, 190);

  & > svg {
    color: #ded;
  }
`;

const AppTitle = styled(Link).attrs({
  className: "appTitle"
})`
  text-decoration: none;
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.25rem;
  font-family: Pacifico;
  &:hover {
    color: #fff;
  }
  & > svg {
    transform: rotate(90deg);
    width: auto;
    padding-left: 6px;
  }
`;

const StyledIconButton = styled(IconButton)`
  & > svg {
    color: #ded;
    background: #ded;
  }
  border-radius: 5px;
`;

const StyledUserMenu = styled(Card)`
  position: absolute;
  right: 0;
  padding: 1rem 10px 1rem 10px;
  min-width: 300px;
  margin-top: 1rem;
`;

const LogoutLink = styled.div`
  width: 100%;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`;

interface HeaderProps {
    history: any
}

const AppHeader: React.FC<HeaderProps> = ({ history }) => {
    const appName = Constants.APP_NAME;
    const [userMenu, showUserMenu] = useState(false);
    const currentUser = useSelector(Selectors.getCurrentUser);
    const { displayName, photoURL, uid } = currentUser;

    const handleLogout = () => {
      firebase
        .auth()
        .signOut()
        .then(function() {
          clearUser();
         })
        .catch(function(error) {
          // An error happened.
        });
    }

    const renderUserMenu = (userMenu: boolean) => {
      return userMenu ? (
        <StyledUserMenu>
          <LogoutLink onClick={handleLogout}>Log out</LogoutLink>
        </StyledUserMenu>
      ) : null;
    }

    return (
      <StyledHeader>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={2}
          style={{ padding: "2px 20px 2px 20px" }}
        >
          <Grid item>
            <StyledIconButton
              aria-label="home"
              onClick={() => history.push(Constants.buildUserURI(uid))}
            >
              <HomeIcon style={{ color: "white" }} />
            </StyledIconButton>
          </Grid>
          <Grid item>
            <AppTitle to={Constants.buildUserURI(uid)}>
              <DnsIcon />
              {appName}
            </AppTitle>
          </Grid>
          <Grid item spacing={3}>
            <Avatar
              alt={displayName}
              src={photoURL}
              style={{ height: "2rem", width: "2rem", cursor: "pointer" }}
              onClick={ () => showUserMenu(!userMenu) }
            />
            { renderUserMenu(userMenu)}
          </Grid>
        </Grid>
      </StyledHeader>
    );
};

export default withRouter(AppHeader);
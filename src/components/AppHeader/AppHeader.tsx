import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from '../../utils/firebase';
import { useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import Card from '@material-ui/core/Card';
import { clearUser } from '../../features/auth/authSlice';
import AppTitle from '../AppTitle/AppTitle';
import * as Constants from "../../constants/index";
import * as Selectors from "../../selectors/index";

const StyledHeader = styled.div<{bg: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: rgb(250, 251, 252);
  z-index: 3;
  background: ${props =>
    (props.bg ? `rgba(0,0,0,0.75)` : "rgb(0, 106, 166)")};

  & > svg {
    color: #ded;
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

interface HeaderProps extends RouteComponentProps {
    background?: boolean
}

const AppHeader: React.FC<HeaderProps> = ({ history, background=false }) => {
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
      <StyledHeader bg={background}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={6}
          style={{ padding: "0 20px 0 20px" }}
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
            <AppTitle light to={Constants.buildUserURI(uid)} />
          </Grid>
          <Grid item>
            <Avatar
              alt={displayName}
              src={photoURL}
              style={{ height: "2rem", width: "2rem", cursor: "pointer" }}
              onClick={() => showUserMenu(!userMenu)}
            />
            {renderUserMenu(userMenu)}
          </Grid>
        </Grid>
      </StyledHeader>
    );
};

export default withRouter(AppHeader);
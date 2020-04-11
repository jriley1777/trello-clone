import React from 'react';
import styled from 'styled-components';
import firebase from '../../utils/firebase';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { clearUser } from '../../features/auth/authSlice';
import AppTitle from '../AppTitle/AppTitle';
import * as Constants from "../../constants/index";
import * as Selectors from "../../selectors/index";

const StyledHeader = styled.div<{bg: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 36px;
  padding: 4px;
  margin: 0;
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

interface HeaderProps {
    background?: boolean
}

const AppHeader: React.FC<HeaderProps> = ({ background=false }) => {
    const history = useHistory();
    const currentUser = useSelector(Selectors.getCurrentUser);
    const { name, photoURL, id } = currentUser;

    //menu functions
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

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

    return (
      <StyledHeader bg={background}>
        {console.log('render')}

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ padding: "0 4px 0 4px" }}
        >
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-start">
              <Grid item>
                <Avatar 
                  variant="rounded"
                  style={{
                    backgroundColor: `rgba(255,255,255,0.3)`,
                    height: '2rem',
                    width: '2.5rem',
                  }}
                  >
                  <StyledIconButton
                    aria-label="home"
                    onClick={() => history.push(Constants.buildUserURI(id))}
                  >
                    <HomeIcon style={{ color: "white" }} />
                  </StyledIconButton> 
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="center">
              <AppTitle light to={Constants.buildUserURI(id)} />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-end">
              <Grid item>
                  <StyledIconButton
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    style={{ height: '2rem', margin: 0, padding: 0}}
                  >
                    <Avatar
                      alt={name}
                      src={photoURL}
                      style={{ height: "2rem", width: "2rem", margin: 0, padding: 0 }}
                    />
                  </StyledIconButton> 
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <MenuItem disabled>{ name }</MenuItem>
                  <hr />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledHeader>
    );
};

export default React.memo(AppHeader);
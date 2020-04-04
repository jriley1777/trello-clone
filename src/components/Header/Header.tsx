import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppTitle from "../AppTitle/AppTitle";

import * as Constants from '../../constants/index';

const StyledHeader = styled.header.attrs({
  className: "header"
})`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
  const history = useHistory();
    return (
      <StyledHeader>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ padding: "20px" }}
        >
          <Grid item>
            <AppTitle />
          </Grid>
          <Grid 
            item
            direction="row"
            alignItems="center">
            <StyledLink to={Constants.URLS.LOGIN}>Login</StyledLink>
            <Button
              variant="contained"
              size="small"
              onClick={() => history.push(Constants.URLS.SIGNUP)}
              >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </StyledHeader>
    );
};

export default Header;
import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import Placeholder from '../components/Placeholder/Placeholder';
import * as Constants from '../constants/index';


const PageWrapper = styled(Container).attrs({
  className: "page"
})`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background: rgb(250,250,250);
  padding: 2rem 0 2rem 0;
  font-size: 1rem;
`;

const AppTitle = styled(RouterLink).attrs({
  className: "appTitle"
})`
  text-decoration: none;
  margin-bottom: 2rem;
  padding: 20px;
  color: rgb(0,135,210);
  font-size: 3rem;
  font-family: Pacifico;
`;

const StyledPaper = styled(Paper)`
  background: #ddd;
  font-size: 0.75rem;
  min-height: 60vh;
  padding: 2rem;
`;

const Auth: React.FC = () => {
    return (
      <PageWrapper>
        <AppTitle to={Constants.URLS.INDEX}>
          {Constants.APP_NAME}
        </AppTitle>
        <Grid
          style={{ marginTop: "2rem" }}
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item sm={4}>
            <Placeholder height="40vh" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledPaper>
              <Grid
                container
                direction="column"
                spacing={3}
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item>
                  <h2>Sign up to {Constants.APP_NAME}</h2>
                </Grid>
                <Grid item xl={12}>
                  <TextField
                    id="email-basic"
                    label="Email"
                    name="email"
                    type="email"
                  />
                </Grid>
                <Grid item>
                  <p>Legal things: TOS and Privacy Policy</p>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" disabled>
                    Continue
                  </Button>
                </Grid>
                or
                <Grid item>
                  <Button variant="contained" color="default">
                    Continue with Google
                  </Button>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to={Constants.URLS.LOGIN}>
                    <h4>Already have an account?</h4>
                  </Link>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
          <Grid item sm={4}>
            <Placeholder height="40vh" />
          </Grid>
        </Grid>
      </PageWrapper>
    );
};

export default Auth;
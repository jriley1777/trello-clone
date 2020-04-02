import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import * as Constants from '../constants/index';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import AuthCard from '../components/AuthCard/AuthCard';


const Auth: React.FC = () => {

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  }
    return (
      <AuthLayout>
        <AuthCard>
          <form onSubmit={handleLogin}>
            <Grid
              container
              direction="column"
              spacing={2}
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <h2>Log in to {Constants.APP_NAME}</h2>
              </Grid>
              <Grid item>
                <TextField
                  size="small"
                  variant="outlined"
                  id="email-basic"
                  label="Email"
                  name="email"
                  type="email"
                />
              </Grid>
              <Grid item>
                <TextField
                  size="small"
                  variant="outlined"
                  id="password-basic"
                  label="Password"
                  name="password"
                  type="password"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Log in
                </Button>
              </Grid>
              or
              <Grid item>
                <Button variant="contained" color="default">
                  Log in with Google
                </Button>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={Constants.URLS.SIGNUP}>
                  <h4>Sign up for an account.</h4>
                </Link>
              </Grid>
            </Grid>
          </form>
        </AuthCard>
      </AuthLayout>
    );
};

export default Auth;
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import AuthLayout from '../components/AuthLayout/AuthLayout';
import AuthCard from '../components/AuthCard/AuthCard';
import * as Constants from '../constants/index';

const Auth: React.FC = () => {
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

  }
    return (
      <AuthLayout>
        <AuthCard>
          <form onSubmit={handleSignup}>
            <Grid
              container
              direction="column"
              spacing={2}
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <h2>Sign up to {Constants.APP_NAME}</h2>
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
                  id="fullname-basic"
                  label="Full Name"
                  name="fullName"
                  type="text"
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
          </form>
        </AuthCard>
      </AuthLayout>
    );
};

export default Auth;
import React, { useEffect, useState, useCallback } from "react";
import styled from 'styled-components';
import firebase, { usersDb } from '../utils/firebase';
import { Link as RouterLink, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import * as Constants from '../constants/index';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import AuthCard from '../components/AuthCard/AuthCard';

type ErrorsArrayType = {message: string}[];

const StyledGridContainer = styled(Grid)`
  & > * {
    width: 60% !important;
  }
`;

const Login: React.FC = () => {
  document.title = "Login to Taskboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorsArrayType>([]);
  const db: any = usersDb();
  const history = useHistory();

  const isValidForm = () => email && password;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidForm()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => history.push(Constants.buildUserURI(user.user!.uid)))
        .catch(err => setErrors([{ message: err.message }]));
    }
  };

  const handleGoogleRedirect = useCallback(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          console.log(result);
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user: any = result.user;
        db.saveUser(user).then(() => {
          console.log("user saved.");
        });
        history.push(Constants.buildUserURI(user.uid));
      })
      .catch(err => {
        setErrors([{ message: err.message }]);
      });
  }, [db, history])

  useEffect(() => {
    handleGoogleRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <form onSubmit={handleLogin}>
          <StyledGridContainer
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
                fullWidth
                size="small"
                variant="outlined"
                id="email-basic"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                id="password-basic"
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained" 
                color="primary" 
                type="submit">
                Log in
              </Button>
            </Grid>
            or
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="default"
                onClick={handleGoogleLogin}
              >
                Log in with Google
              </Button>
            </Grid>
            {/* <Grid item>
              { errors.map(err => err.message).join(" ") }
            </Grid> */}
            <Grid item>
              <Link component={RouterLink} to={Constants.URLS.SIGNUP}>
                <h4>Sign up for an account.</h4>
              </Link>
            </Grid>
          </StyledGridContainer>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
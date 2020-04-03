import React, { useEffect, useState } from "react";
import firebase from '../utils/firebase';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import * as Constants from '../constants/index';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import AuthCard from '../components/AuthCard/AuthCard';

type ErrorsArrayType = {message: string}[];

const Auth: React.FC = () => {
  document.title = "Login to Taskboard";
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState<ErrorsArrayType>([]);
  const usersRef = firebase.database().ref("users");

  const isValidForm = () => email && password;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(isValidForm()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => setErrors([{ message: err.message }]));
    }
  }

  const saveUser = (user: any) => {
    return usersRef.child(user.uid).set({
      name: user.displayName,
      photoURL: user.photoURL || "",
      email: user.email
    });
  };

  const handleGoogleRedirect = () => {
    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          console.log(result);
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user: any = result.user;
        saveUser(user).then(() => {
          console.log("user saved.");
        });
      })
      .catch(err => {
        setErrors([{ message: err.message }]);
      });
  };

  useEffect(() => {
    handleGoogleRedirect();
  }, []);

  const handleGoogleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };


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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Log in
                </Button>
              </Grid>
              or
              <Grid item>
                <Button
                  variant="contained"
                  color="default"
                  onClick={handleGoogleLogin}
                >
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
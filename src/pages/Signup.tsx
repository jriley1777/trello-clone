import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components';
import firebase, { usersDb } from '../utils/firebase'
import * as qs from "query-string";
import {
  Link as RouterLink,
  RouteComponentProps
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import AuthCard from '../components/AuthCard/AuthCard';
import * as Constants from '../constants/index';

type ErrorsArrayType = {message: string}[];

const StyledGridContainer = styled(Grid)`
  & > * {
    width: 60% !important;
  }
`;

const Signup: React.FC<RouteComponentProps> = ({ location, history }) => {
  document.title = "Sign up to Taskboard";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsArrayType>([]);
  const db: any = usersDb();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidForm()) {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser: any) => {
          let user = createdUser.user;
          user
            .updateProfile({
              displayName: name
            })
            .then(() => {
              db.saveUser(user);
            })
            .catch((err: any) => {
              setErrors([{ message: err.message }]);
            });
          history.push(Constants.buildUserURI(user.uid));
          setLoading(false);
        })
        .catch((err: any) => {
          setErrors([{ message: err.message }]);
          setLoading(false);
        });
    }
  };

  const handleGoogleRedirect = useCallback(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user: any = result.user;
        db.saveUser(user);
        history.push(Constants.buildUserURI(user.uid));
      })
      .catch(err => {
        setErrors([{ message: err.message }]);
      });
  }, [db, history]);

  useEffect(() => {
    handleGoogleRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const isValidForm = () => {
    if (email && name && password) {
      return true;
    } else {
      return false;
    }
  };

  const parseURIParams = useCallback(() => {
    let params = qs.parseUrl(location.search);
    let parsedEmail = params && params.query.email;
    if (parsedEmail && typeof parsedEmail === "string") {
      setEmail(parsedEmail);
    }
  }, [location.search]);

  useEffect(() => {
    parseURIParams();
  }, [parseURIParams]);

  return (
    <AuthLayout>
      <AuthCard>
        <form onSubmit={handleSignup}>
          <StyledGridContainer
            container
            direction="column"
            spacing={2}
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Grid container direction="row" justify="center">
                <Grid item>
                  <h2>Sign up to {Constants.APP_NAME}</h2>
                </Grid>
              </Grid>
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
                id="fullname-basic"
                label="Full Name"
                name="fullName"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
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
              <Grid container direction="row" justify="center">
                <Grid item>
                  <p>Legal things: TOS and Privacy Policy</p> 
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValidForm() || loading}
              >
                Sign up
              </Button>
            </Grid>
            or
            <Grid item>
              <Button
                fullWidth
                onClick={handleGoogleLogin}
                variant="contained"
                color="default"
              >
                Continue with Google
              </Button>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="center">
                <Grid item>
                  <Link component={RouterLink} to={Constants.URLS.LOGIN}>
                    <h4>Already have an account?</h4>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </StyledGridContainer>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;
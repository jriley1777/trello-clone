import React, { useState, useEffect } from "react";
import firebase from '../utils/firebase'
import * as qs from "query-string";
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import AuthCard from '../components/AuthCard/AuthCard';
import * as Constants from '../constants/index';

interface SignupProps {
  location: any 
}

type ErrorsArrayType = {message: string}[];

const Signup: React.FC<SignupProps> = ({ location }) => {
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ errors, setErrors] = useState<ErrorsArrayType>([]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidForm()) {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser: any) => {
          createdUser.user
            .updateProfile({
              displayName: name
            })
          setLoading(false);
        })
        .catch(err => {
          setErrors([{ message: err.message }]);
          setLoading(false);
        });
    }
  };

  const handleGoogleAuth = () => {
    let googleProvider = new firebase.auth.GoogleAuthProvider(); 
    return null;
  };

  const isValidForm = () => {
   if (email && name && password) {
     return true;
   } else {
     return false;
   }
  }

  const parseURIParams = () => {
    let params = qs.parseUrl(location.search);
    let parsedEmail = params && params.query.email;
    if (parsedEmail && typeof parsedEmail === 'string') {
      setEmail(parsedEmail);
    }
  }; 

  useEffect(() => {
    parseURIParams();
  }, []);

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
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                value={name}
                onChange={e => setName(e.target.value)}
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
              <p>Legal things: TOS and Privacy Policy</p>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValidForm() || loading || errors.length > 0}
              >
                Continue
              </Button>
            </Grid>
            or
            <Grid item>
              <Button
                variant="contained"
                color="default"
                onClick={handleGoogleAuth}
              >
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

export default withRouter(Signup);
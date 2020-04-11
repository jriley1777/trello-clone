import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import firebase, { usersDb } from "./utils/firebase";
import './index.css';
import App from './app/App';
import { Provider, useDispatch } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { setUser, clearUser } from './features/auth/authSlice';
import * as Constants from './constants/index';

import store from './utils/redux';

const Root: React.FC = () => {
  document.title = "Taskboard";
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const db: any = usersDb();

  const handleGoogleRedirect = useCallback(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user: any = result.user;
        history.push(Constants.buildUserURI(user.uid));
        db.saveUser(user);
      })
      .catch((err) => {
        console.error(err)
      });
  }, [db, history]);

  useEffect(() => {
    handleGoogleRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser({
          user: {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
          }
        }));
        if ([Constants.URLS.INDEX, Constants.URLS.LOGIN].includes(history.location.pathname)) {
          history.push(Constants.buildUserURI(user.uid));
        }
        setLoading(false);
      } else {
        setLoading(false);
        dispatch(clearUser());
      }
    });
  }, [history, dispatch]);

  return !loading ? <App /> : null;
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Root />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

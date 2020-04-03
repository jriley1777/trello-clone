import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import firebase from './utils/firebase';
import './index.css';
import App from './app/App';
import { Provider, useDispatch } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { setUser, clearUser } from './features/auth/authSlice';
import * as Constants from './constants/index';

import store from './utils/redux';

interface RootProps {
  history: any
}
const Root: React.FC<RootProps> = ({ history }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if(process.env.NODE_ENV === 'development') {
          console.log(user)
        }
        dispatch(setUser({
          user: {
            email: user.email,
            displayName: user.displayName,
            avatar: user.photoURL,
            uid: user.uid
          }
        }));
        history.push(Constants.buildUserURI(user.uid));
        setLoading(false);
      } else {
        dispatch(clearUser());
        setLoading(false);
      }
    });
  }, [history, dispatch]);

  return !loading ? <App /> : null;
};

const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootWithAuth />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, withRouter,  } from "react-router-dom";
import firebase from './utils/firebase';
import './index.css';
import App from './app/App';
import { Provider, useDispatch, useSelector } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { setUser, clearUser } from './features/auth/authSlice';
import { setBoards, clearBoards } from './features/boards/boardsSlice';
import { setStarredBoards } from './features/boards/starredBoardsSlice';
import * as Constants from './constants/index';
import { Board } from './models/index.models'
import * as Selectors from './selectors/index';

import store from './utils/redux';

interface RootProps {
  history: any
}
const Root: React.FC<RootProps> = ({ history }) => {
  document.title = "Taskboard";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const boardsRef = firebase.database().ref('boards');
  const starredRef = firebase.database().ref('starredBoards');
  const isAuthenticated = useSelector(Selectors.isAuthenticated);
  const currentUser = useSelector(Selectors.getCurrentUser);

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
            photoURL: user.photoURL,
            uid: user.uid
          }
        }));
        if ([Constants.URLS.INDEX, Constants.URLS.LOGIN].includes(history.location.pathname)) {
          history.push(Constants.buildUserURI(user.uid));
        }
        setLoading(false);
      } else {
        dispatch(clearUser())
        dispatch(clearBoards());
        setLoading(false);
      }
    });
  }, [history, dispatch]);

  useEffect(() => {
    if (isAuthenticated){
      setLoading(true);
      boardsRef.child(currentUser.uid).on('value', snap => {
        const loadedBoards: Board[] = [];
        if (snap.val()) {
          Object.entries(snap.val()).forEach(([key, value]: [string, any]) => {
            if(!value.deleted){ 
              loadedBoards.push({
                boardId: key,
                deleted: value.deleted || false,
                ...value
              })
            }
          });
          dispatch(setBoards(loadedBoards));
        }
        starredRef.child(currentUser.uid).on('value', snap => {
          if (snap.val()) {
            const loadedStars = Object.keys(snap.val());
            dispatch(setStarredBoards(loadedStars));
          }
          setLoading(false);
        })
      });
    }
  }, [isAuthenticated])

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

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, withRouter,  } from "react-router-dom";
import firebase, {DB_REFS} from './utils/firebase';
import './index.css';
import App from './app/App';
import { Provider, useDispatch, useSelector } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { setUser, clearUser } from './features/auth/authSlice';
import { setBoards, clearBoards } from './features/boards/boardsSlice';
import { setBoardStars, clearBoardStars } from './features/boards/starsSlice';
import * as Constants from './constants/index';
import * as Selectors from './selectors/index';

import store from './utils/redux';

interface RootProps {
  history: any
}
const Root: React.FC<RootProps> = ({ history }) => {
  document.title = "Taskboard";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector(Selectors.isAuthenticated);
  const currentUser = useSelector(Selectors.getCurrentUser);
  const boards = useSelector(Selectors.getBoards);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if(process.env.NODE_ENV === 'development') {
          console.log(user)
        }
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
      } else {
        dispatch(clearUser());
      }
    });
  }, [history, dispatch]);

  useEffect(() => {
    const boardsRef = DB_REFS.boards;
    const starredRef = DB_REFS.starredBoards;
    if (isAuthenticated){
      starredRef.child(currentUser.id).on('value', snap => {
        if (snap.val()) {
          let loaded: string[] = Object.keys(snap.val());
          dispatch(setBoardStars(loaded));
        } else {
          dispatch(clearBoardStars());
        }
      });
      boardsRef.child(currentUser.id!).on('value', snap => {
        if (snap.val()) {
          let allIds = Object.keys(snap.val()).filter(x => snap.val()[x].deleted === false);
          let byId: any = {};
          allIds.forEach(id => {
            byId[id] = snap.val()[id];
            byId[id].id = id;
          })
          let loaded: { byId: any, allIds: string[] } = { byId, allIds };
          dispatch(setBoards(loaded));
        } else {
          dispatch(clearBoards());
        }
      });
    }
  }, [isAuthenticated, currentUser.id, dispatch]);

  useEffect(() => {
    if(boards.length > 0){
      setLoading(false)
    }
  }, [boards])

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

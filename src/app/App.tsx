import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { setBoards, clearBoards } from '../features/boards/boardsSlice';
import { setBoardStars, clearBoardStars } from '../features/boards/starsSlice';
import { DB_REFS } from '../utils/firebase';
import { ROUTES } from '../constants/index';
import * as Selectors from '../selectors/index';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(Selectors.isAuthenticated);
  const currentUser = useSelector(Selectors.getCurrentUser);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const boardsRef = DB_REFS.boards;
    const starredRef = DB_REFS.starredBoards;
    if (isAuthenticated) {
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
          setLoading(false);
        } else {
          setLoading(false);
          dispatch(clearBoards());
        }
      });
      starredRef.child(currentUser.id).on('value', snap => {
        if (snap.val()) {
          let loaded: string[] = Object.keys(snap.val());
          dispatch(setBoardStars(loaded));
        } else {
          dispatch(clearBoardStars());
        }
      });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, currentUser.id, dispatch]);


  const renderRoutes = () => ROUTES.map(({ route, component, exact, isPrivate }) => {
    return isPrivate ? (
      <PrivateRoute
        key={route}
        path={route}
        exact={exact}
        component={component}
      />
    ) : (
        <Route key={route} path={route} exact={exact} component={component} />
      );
  });
  return !loading ? (
    <Switch>
      {renderRoutes()}
    </Switch>
  ) : null;
};

export default App;
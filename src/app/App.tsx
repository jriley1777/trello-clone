import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../constants/index';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

const App = () => {
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
  return (
    <Switch>
      {renderRoutes()}
    </Switch>
  )
};

export default App;
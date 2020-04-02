import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../constants/index';

const AppRoutes = () => {
    const renderRoutes = () => ROUTES.map(({route, exact, component}) => {
        return <Route key={route} path={route} exact={exact} component={component} />
    });
    return (
        <Switch>
            { renderRoutes() }
        </Switch>
    )
};

export default AppRoutes;
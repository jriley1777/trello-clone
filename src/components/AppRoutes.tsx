import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../constants/index';

const AppRoutes = () => {
    const renderRoutes = () => ROUTES.map(({route, exact, component}) => {
        return <Route key={route} path={route} exact={exact} component={component} />
    });
    return (
        <Router>
            <Switch>
                { renderRoutes() }
            </Switch>
        </Router>
    )
};

export default AppRoutes;
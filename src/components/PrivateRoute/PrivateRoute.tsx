import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import * as Selectors from '../../selectors/index';
import * as Constants from '../../constants/index';

interface RouteProps {
    path: string,
    component: any,
    exact: boolean
}

const PrivateRoute: React.FC<RouteProps>  = ({ path, component, exact }) => {
    const isAuthenticated = useSelector(Selectors.isAuthenticated);
    return isAuthenticated ? <Route path={path} component={component} exact={exact} /> : <Redirect to={Constants.URLS.LOGIN} />
};

export default PrivateRoute;
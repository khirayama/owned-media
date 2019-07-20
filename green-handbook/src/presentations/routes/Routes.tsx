import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from '../../presentations/pages/Home';
import { Resource } from '../../presentations/pages/Resource';
import { fetchResource } from '../../usecases';

export const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
    initializer: null,
  },
  {
    exact: true,
    path: `/:resourceType/:key`,
    component: Resource,
    initializer: params => fetchResource(params.key),
  },
];

export function Routes() {
  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
      ))}
    </Switch>
  );
}

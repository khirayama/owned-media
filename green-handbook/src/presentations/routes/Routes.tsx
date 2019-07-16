import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from '../../presentations/pages/Home';
import { About } from '../../presentations/pages/About';
import { Users } from '../../presentations/pages/Users';
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
    component: Users,
    initializer: params => fetchResource(params.key),
  },
  {
    exact: true,
    path: `/about`,
    component: About,
    initializer: null,
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

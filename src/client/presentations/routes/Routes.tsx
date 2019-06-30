import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from 'client/presentations/pages/Home';
import { About } from 'client/presentations/pages/About';
import { Resources } from 'client/presentations/pages/Resources';
import { Resource } from 'client/presentations/pages/Resource';

import { config } from 'config';

export const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
    initializer: null,
  },
  {
    exact: true,
    path: '/about',
    component: About,
    initializer: null,
  },
  // For adming
  {
    exact: true,
    path: `${config.path.admin}/resources`,
    component: Resources,
    initializer: null,
  },
  {
    exact: true,
    path: `${config.path.admin}/resources/new`,
    component: Resource,
    initializer: null,
  },
  {
    exact: true,
    path: `${config.path.admin}/resources/:id`,
    component: Resource,
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

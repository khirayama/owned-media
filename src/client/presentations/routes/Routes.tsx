import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from 'client/presentations/pages/Home';
import { About } from 'client/presentations/pages/About';
import { Resources } from 'client/presentations/pages/Resources';
import { fetchResources, fetchResource } from 'client/usecases';

import { Counter } from 'client/containers/Counter';

function Resource() {
  return (
    <div>
      <h2>Resource</h2>
      <Counter />
    </div>
  );
}

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
    path: '/resources',
    component: Resources,
    initializer: fetchResources,
  },
  {
    exact: true,
    path: '/resources/:id',
    component: Resource,
    initializer: fetchResource,
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

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from 'client/presentations/pages/Home';
import { About } from 'client/presentations/pages/About';
import { Users } from 'client/presentations/pages/Users';
import { fetchResources, fetchResource } from 'client/usecases';

import { Counter } from 'client/containers/Counter';

function Resources() {
  return (
    <div>
      <h2>Resources</h2>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  );
}

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
  {
    exact: true,
    path: '/users',
    component: Users,
    initializer: null,
  },
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

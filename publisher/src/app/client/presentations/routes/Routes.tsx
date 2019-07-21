import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { fetchResources, fetchResource } from '../../usecases';
import { Resources } from '../pages/Resources';
import { Resource } from '../pages/Resource';

export const routes = [
  {
    exact: true,
    path: '/',
    component: Resources,
    initializer: () => fetchResources(),
  },
  {
    exact: true,
    path: `/resources`,
    component: Resources,
    initializer: () => fetchResources(),
  },
  {
    exact: true,
    path: `/resources/new`,
    component: Resource,
    initializer: null,
  },
  {
    exact: true,
    path: `/resources/:id`,
    component: Resource,
    initializer: params => fetchResource(params.id),
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

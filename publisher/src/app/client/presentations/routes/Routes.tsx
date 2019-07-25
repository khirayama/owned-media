import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { initializeResources, initializeNewResource, initializeResource } from '../../usecases';
import { Resources } from '../pages/Resources';
import { Resource } from '../pages/Resource';

interface Props {
  baseUrl: string;
}

export const routes = [
  {
    exact: true,
    path: '/',
    component: Resources,
    initializer: () => initializeResources(),
  },
  {
    exact: true,
    path: '/resources',
    component: Resources,
    initializer: () => initializeResources(),
  },
  {
    exact: true,
    path: '/resources/new',
    component: Resource,
    initializer: () => initializeNewResource(),
  },
  {
    exact: true,
    path: '/resources/:id',
    component: Resource,
    initializer: params => initializeResource(params.id),
  },
];

export function Routes(props: Props) {
  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.path} exact={route.exact} path={props.baseUrl + route.path} component={route.component} />
      ))}
    </Switch>
  );
}

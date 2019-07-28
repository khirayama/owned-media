import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { fetchResources, fetchResource } from '../../usecases';
import { Resources } from '../pages/Resources';
import { Resource } from '../pages/Resource';

export interface Props {
  baseUrl: string;
}

export interface RouteObj {
  exact: boolean;
  path: string;
  component: any;
  initializer: any;
}

export const routes: RouteObj[] = [
  {
    exact: true,
    path: '/',
    component: Resources,
    initializer: () => fetchResources(),
  },
  {
    exact: true,
    path: '/resources',
    component: Resources,
    initializer: () => fetchResources(),
  },
  {
    exact: true,
    path: '/resources/new',
    component: Resource,
    initializer: null,
  },
  {
    exact: true,
    path: '/resources/:id',
    component: Resource,
    initializer: (params: any) => fetchResource(params.id),
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

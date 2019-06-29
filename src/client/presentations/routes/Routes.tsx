import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from 'client/presentations/pages/Home';
import { About } from 'client/presentations/pages/About';
import { ResourceList } from 'lib/components/ResourceList';
import { ResourceForm } from 'lib/components/ResourceForm';
import { Props as ResourceListItemProps } from 'lib/components/ResourceListItem';

import { config } from 'config';

class Resources extends React.Component<any, any> {
  public render() {
    const onClickNewResourceButton = () => {
      this.props.history.push(`${config.path.admin}/resources/new`);
    };

    const onClickEditResourceButton = (event: React.MouseEvent<HTMLButtonElement>, props: ResourceListItemProps) => {
      this.props.history.push(`${config.path.admin}/resources/${props.resource.id}`);
    };

    return (
      <ResourceList
        onClickNewResourceButton={onClickNewResourceButton}
        onClickEditResourceButton={onClickEditResourceButton}
      />
    );
  }
}

class Resource extends React.Component<any, any> {
  public render() {
    const id = this.props.match.params.id || null;
    const onClickResourcesLink = () => {
      this.props.history.push(`${config.path.admin}/resources`);
    };

    return <ResourceForm resourceId={id} onClickResourcesLink={onClickResourcesLink} />;
  }
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

import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { State } from '../reducers';

interface Props {
  baseUrl: string;
  exact: boolean;
  path: string;
  component: any;
}

function Component(props: Props) {
  console.log(props);
  return <Route exact={props.exact} path={`${props.baseUrl}${props.path}`} component={props.component} />;
}

const mapStateToProps = (state: State) => {
  const baseUrl = state.settings.baseUrl;

  return {
    baseUrl,
  };
};

export const AppRoute = connect(
  mapStateToProps,
  null,
)(Component);

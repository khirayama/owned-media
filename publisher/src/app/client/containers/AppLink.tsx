import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { State } from '../reducers';

interface Props {
  baseUrl: string;
  to: string;
  children: React.ReactChild;
}

function Component(props: Props) {
  return <Link to={`${props.baseUrl}${props.to}`}>{props.children}</Link>;
}

const mapStateToProps = (state: State) => {
  const baseUrl = state.settings.baseUrl;

  return {
    baseUrl,
  };
};

export const AppLink = connect(
  mapStateToProps,
  null,
)(Component);

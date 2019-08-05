import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { State } from '../reducers';

export interface Props {
  locale: string;
  to: string;
  children: React.ReactChild;
}

function Component(props: Props) {
  const to = `${props.locale ? `/${props.locale}` : ''}${props.to}`;
  return <Link to={to}>{props.children}</Link>;
}

const mapStateToProps = (state: State) => {
  const defaultLocale = state.config ? state.config.locales[0] : '';

  return {
    locale: state.ui.locale === defaultLocale ? '' : state.ui.locale,
  };
};

export const AppLink = connect(
  mapStateToProps,
  null,
)(Component);

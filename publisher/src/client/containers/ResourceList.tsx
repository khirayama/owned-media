import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { ResourceList as Component } from '../presentations/components/ResourceList';
import { asyncDecrement } from '../usecases';
import { State } from '../reducers';

const mapStateToProps = (state: State) => {
  return {
    locale: state.ui.locale, // For react-intl
    resources: state.resources,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    onClickDeleteResourceButton: () => {
      dispatch(asyncDecrement());
    },
  };
};

export const Counter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

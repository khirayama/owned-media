import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { ResourceListItem as Component } from '../presentations/components/ResourceListItem';
import { increment, decrement } from '../actions';
import { asyncIncrement, asyncDecrement } from '../usecases';
import { State } from '../reducers';

const mapStateToProps = (state: State) => {
  return {
    locale: state.ui.locale, // For react-intl
    count: state.count,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    onCountUpClick: () => {
      dispatch(increment());
    },
    onCountDownClick: () => {
      dispatch(decrement());
    },
    onCountUpAsyncClick: () => {
      dispatch(asyncIncrement());
    },
    onCountDownAsyncClick: () => {
      dispatch(asyncDecrement());
    },
  };
};

export const Counter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

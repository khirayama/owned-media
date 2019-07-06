import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { fetchingCount, fetchedCount, increment, decrement } from '../actions';

class ExampleAPI {
  public static call() {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

export const asyncIncrement = () => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(fetchingCount());
    ExampleAPI.call().then(() => {
      dispatch(increment());
      dispatch(fetchedCount());
    });
  };
};

export const asyncDecrement = () => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(fetchingCount());
    ExampleAPI.call().then(() => {
      dispatch(decrement());
      dispatch(fetchedCount());
    });
  };
};

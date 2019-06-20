import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { fetchingCount, fetchedCount, increment, decrement } from 'client/actions';
import { ExampleAPI } from 'client/services';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchResources = (params: any) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(fetchingCount());
    return ExampleAPI.call().then(() => {
      dispatch(increment());
      dispatch(fetchedCount());
    });
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchResource = (params: any) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(fetchingCount());
    return ExampleAPI.call().then(() => {
      dispatch(increment());
      dispatch(fetchedCount());
    });
  };
};

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

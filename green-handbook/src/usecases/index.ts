import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { setResource } from '../actions';
import { Resource } from '../services';

export const fetchResource = (key: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>, getState) => {
    const state = getState();
    return Resource.find(key, state.ui.locale).then(resource => {
      dispatch(setResource(resource));
    });
  };
};

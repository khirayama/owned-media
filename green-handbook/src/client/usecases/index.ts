import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { setResource, changeIsFetchingResource, resetResource } from '../actions/resources';
import { changeLocale } from '../actions/ui';
import { State } from '../reducers';
import { Resource } from '../services';

export const fetchResource = (key: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>, getState: () => State) => {
    const state = getState();
    dispatch(changeIsFetchingResource(key, true));
    return Resource.find(key, state.ui.locale).then(resource => {
      dispatch(setResource(resource));
      dispatch(changeIsFetchingResource(key, false));
    });
  };
};

export const moveTo = (locale: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(resetResource());
    dispatch(changeLocale(locale));
  };
};

import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Config, ResourceShape } from 'yggdrasil';

import { changeIsFetchingResource, resetResource, setResource } from '../actions/resources';
import { changeLocale } from '../actions/ui';
import { setConfig } from '../actions/config';
import { State } from '../reducers';
import { Resource } from '../services';

export const initializePage = (locale: string, config: Config) => {
  return (dispatch: ThunkDispatch<State, {}, Action>) => {
    return new Promise(resolve => resolve()).then(() => {
      dispatch(setConfig(config));
      dispatch(changeLocale(locale));
    });
  };
};

export const fetchResource = (key: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>, getState: () => State) => {
    const state = getState();
    dispatch(changeIsFetchingResource(key, true));
    return Resource.find(key, { locale: state.ui.locale }).then(resource => {
      dispatch(setResource(resource as ResourceShape));
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

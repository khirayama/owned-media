import clone from 'rfdc';

import { Actions } from '../actions/ui';

export interface State {
  locale: string;
  pathname: string;
}

export const initialState: State = {
  locale: 'ja',
  pathname: '/',
};

export function reducer(state = initialState, action: Actions) {
  const newState: State = clone()(state);

  switch (action.type) {
    case 'CHANGE_LOCALE': {
      newState.locale = action.payload.locale;
      break;
    }
    case 'SET_PATHNAME': {
      newState.pathname = action.payload.pathname;
      break;
    }
    default:
  }

  return newState;
}

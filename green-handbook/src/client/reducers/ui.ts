import clone from 'rfdc';

import { Actions } from '../actions/ui';

export interface State {
  locale: string;
}

export const initialState: State = {
  locale: 'en',
};

export function reducer(state = initialState, action: Actions) {
  const newState: State = clone()(state);

  switch (action.type) {
    case 'CHANGE_LOCALE': {
      newState.locale = action.payload.locale;
      break;
    }
    default:
  }

  return newState;
}

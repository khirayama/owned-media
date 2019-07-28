import clone from 'rfdc';

import { Config } from 'publisher';

import { Actions } from '../actions/config';

export function reducer(state: Config | null = null, action: Actions): Config | null {
  let newState: Config | null = clone()(state);

  switch (action.type) {
    case 'SET_CONFIG': {
      newState = action.payload.config || null;
      break;
    }
    default:
  }

  return newState;
}

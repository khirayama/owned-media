// eslint-disable-next-line node/no-missing-import, node/no-extraneous-import
import { ResourceShape } from 'publisher';

declare var window: any;

export interface State {
  resources: {
    [key: string]: ResourceShape;
  };
  ui: {
    locale: string;
  };
}

export const initialState: State = {
  resources: {},
  ui: {
    locale: 'en',
  },
};

export function reducer(state = initialState, action: any) {
  const newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case 'SET_RESOURCE': {
      const resource = payload.resource;
      newState.resources[resource.key || resource.id] = resource;
      break;
    }
    case 'CHANGE_LOCALE': {
      newState.ui.locale = payload.locale;
      break;
    }
    default:
  }
  console.log('state', state);
  console.log('action', action);
  console.log('newState', newState);
  return newState;
}

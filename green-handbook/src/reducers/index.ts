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

  switch (action.type) {
    case 'CHANGE_LOCALE': {
      newState.ui.locale = action.payload.locale;
      break;
    }
    default:
  }
  return newState;
}

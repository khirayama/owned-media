import * as path from 'path';

import { ResourceShape } from '../../types';

const CONFIG_PATH = path.join(process.cwd(), 'config');
const { config } = require(CONFIG_PATH);

export interface State {
  resources: {
    isFetching: boolean[];
    data: ResourceShape[];
  };
  ui: {
    locale: string;
  };
}

export const initialState: State = {
  resources: {
    isFetching: [],
    data: [],
  },
  ui: {
    locale: config.locales[0],
  },
};

export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'CHANGE_LOCALE': {
      return {
        resources: state.resources,
        ui: {
          locale: action.payload.locale,
        },
      };
    }
    default:
  }
  return state;
}

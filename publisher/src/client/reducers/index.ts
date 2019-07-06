import { ResourceShape } from '../../types';
import { loadConfig } from '../../utils';

const config = loadConfig();

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
  const payload = action.payload;

  switch (action.type) {
    case 'CHANGE_IS_FETCHING_RESOURCES': {
      if (payload.isFetching) {
        state.resources.isFetching.push(true);
      } else {
        state.resources.isFetching.shift();
      }
      return {
        ...state,
        resources: {
          isFetching: state.resources.isFetching,
          data: state.resources.data,
        },
      };
    }
    case 'SET_RESOURCES': {
      return {
        ...state,
        resources: {
          ...state.resources,
          data: payload.resources,
        },
      };
    }
    case 'REMOVE_RESOURCES': {
      return {
        ...state,
        resources: {
          ...state.resources,
          data: state.resources.data.filter((resource: ResourceShape) => resource.id !== payload.resourceId),
        },
      };
    }
    case 'CHANGE_LOCALE': {
      return {
        ...state,
        ui: {
          locale: action.payload.locale,
        },
      };
    }
    default:
  }
  return state;
}

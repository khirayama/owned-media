import { ResourceShape, ResourceFullShape } from '../../types';
import { loadConfig } from '../../utils';

const config = loadConfig();

export interface State {
  resources: {
    isFetching: boolean[];
    data: ResourceShape[];
  };
  resourceFull: {
    isFetching: boolean[];
    data: ResourceFullShape | null;
  };
  ui: {
    locale: string;
    resourceLocale: string;
  };
}

export const initialState: State = {
  resources: {
    isFetching: [],
    data: [],
  },
  resourceFull: {
    isFetching: [],
    data: null,
  },
  ui: {
    locale: 'en',
    resourceLocale: config.locales[0],
  },
};

export function reducer(state: State = initialState, action: any): State {
  const payload = action.payload;

  switch (action.type) {
    case 'CHANGE_IS_FETCHING_RESOURCES': {
      if (payload.isFetching) {
        state.resources.isFetching.push(true);
      } else {
        state.resources.isFetching.shift();
      }
      return state;
    }
    case 'CHANGE_IS_FETCHING_RESOURCE_FULL': {
      if (payload.isFetching) {
        state.resources.isFetching.push(true);
      } else {
        state.resources.isFetching.shift();
      }
      return state;
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
    case 'SET_RESOURCE_FULL': {
      return {
        ...state,
        resourceFull: {
          ...state.resourceFull,
          data: payload.resourceFull,
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
          ...state.ui,
          locale: action.payload.locale,
        },
      };
    }
    default:
  }
  return state;
}

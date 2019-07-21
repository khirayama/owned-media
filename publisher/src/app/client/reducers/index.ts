import { ResourceWithAllLocalesShapeWithRelations, Config } from '../../../types';

export interface State {
  config: Config | null;
  resources: {
    isFetching: boolean[];
    data: {
      [key: string]: ResourceWithAllLocalesShapeWithRelations;
    };
  };
  app: {
    resource: ResourceWithAllLocalesShapeWithRelations | null;
  };
  ui: {
    locale: string;
    resourceLocale: string;
  };
}

export const initialState: State = {
  config: null,
  resources: {
    isFetching: [],
    data: {},
  },
  app: {
    resource: null,
  },
  ui: {
    locale: 'en',
    resourceLocale: 'all',
  },
};

export function reducer(state: State = initialState, action: any): State {
  const payload = action.payload;
  let nextState = state;

  switch (action.type) {
    // config
    case 'SET_CONFIG': {
      nextState.config = action.payload.config;
      break;
    }
    // resources
    case 'CHANGE_IS_FETCHING_RESOURCES': {
      if (payload.isFetching) {
        nextState.resources.isFetching.push(true);
      } else {
        nextState.resources.isFetching.shift();
      }
      break;
    }
    case 'CHANGE_IS_FETCHING_RESOURCE': {
      if (payload.isFetching) {
        nextState.resources.isFetching.push(true);
      } else {
        nextState.resources.isFetching.shift();
      }
      break;
    }
    case 'SET_RESOURCES': {
      nextState = {
        ...state,
        resources: {
          ...state.resources,
          data: payload.resources,
        },
      };
      break;
    }
    case 'REMOVE_RESOURCE': {
      delete nextState.resources.data[payload.resourceId];
      nextState = {
        ...state,
        resources: {
          ...state.resources,
          data: state.resources.data,
        },
      };
      break;
    }
    // app
    case 'SET_RESOURCE': {
      nextState = {
        ...state,
        app: {
          ...state.app,
          resource: payload.resource,
        },
      };
      break;
    }
    case 'CHANGE_LOCALE': {
      nextState = {
        ...state,
        ui: {
          ...state.ui,
          locale: action.payload.locale,
        },
      };
      break;
    }
    default:
  }

  return nextState;
}

import { createDefaultResource } from '../../utils';
import { ResourceWithAllLocalesShapeWithRelations } from '../../types';

export interface State {
  resources: {
    isFetching: boolean[];
    data: {
      [key: string]: ResourceWithAllLocalesShapeWithRelations;
    };
  };
  app: {
    resource: ResourceWithAllLocalesShapeWithRelations;
  };
  ui: {
    locale: string;
    resourceLocale: string;
  };
}

export const initialState: State = {
  resources: {
    isFetching: [],
    data: {},
  },
  app: {
    resource: createDefaultResource(),
  },
  ui: {
    locale: 'en',
    resourceLocale: 'all',
  },
};

export function reducer(state: State = initialState, action: any): State {
  const payload = action.payload;

  switch (action.type) {
    // resources
    case 'CHANGE_IS_FETCHING_RESOURCES': {
      if (payload.isFetching) {
        state.resources.isFetching.push(true);
      } else {
        state.resources.isFetching.shift();
      }
      return state;
    }
    case 'CHANGE_IS_FETCHING_RESOURCE': {
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
    case 'REMOVE_RESOURCE': {
      delete state.resources.data[payload.resourceId];
      return {
        ...state,
        resources: {
          ...state.resources,
          data: state.resources.data,
        },
      };
    }
    // app
    case 'SET_RESOURCE': {
      return {
        ...state,
        app: {
          ...state.app,
          resource: payload.resource,
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

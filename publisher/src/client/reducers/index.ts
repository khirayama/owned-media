import { ResourceWithAllLocalesShape } from '../../types';

export interface State {
  resources: {
    isFetching: boolean[];
    data: ResourceWithAllLocalesShape[];
  };
  resource: {
    isFetching: boolean[];
    data: ResourceWithAllLocalesShape | null;
    relatedResources: {
      isFetching: boolean[];
      data: ResourceWithAllLocalesShape[];
    };
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
  resource: {
    isFetching: [],
    data: null,
    relatedResources: {
      isFetching: [],
      data: [],
    },
  },
  ui: {
    locale: 'en',
    resourceLocale: 'all',
  },
};

export function reducer(state: State = initialState, action: any): State {
  const payload = action.payload;
  console.log(state, action);

  switch (action.type) {
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
    case 'SET_RESOURCE': {
      return {
        ...state,
        resource: {
          ...state.resource,
          data: payload.resource,
        },
      };
    }
    case 'REMOVE_RESOURCES': {
      return {
        ...state,
        resources: {
          ...state.resources,
          data: state.resources.data.filter(
            (resource: ResourceWithAllLocalesShape) => resource.id !== payload.resourceId,
          ),
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

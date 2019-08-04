import clone from 'rfdc';

import { Config } from '../../../api';
import { ResourceWithAllLocalesShapeWithRelations } from '../../types';

export interface State {
  config: Config;
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
    baseUrl: string;
  };
}

export function createInitialState(config: Config, locale: string, baseUrl: string): State {
  return {
    config,
    resources: {
      isFetching: [],
      data: {},
    },
    app: {
      resource: null,
    },
    ui: {
      locale,
      resourceLocale: 'all',
      baseUrl,
    },
  };
}

export function reducer(state: State | null = null, action: any): State | null {
  if (!state) {
    return state;
  }

  const payload = action.payload;
  let newState: State = clone()(state);

  switch (action.type) {
    // resources
    case 'CHANGE_IS_FETCHING_RESOURCES': {
      if (payload.isFetching) {
        newState.resources.isFetching.push(true);
      } else {
        newState.resources.isFetching.shift();
      }
      break;
    }
    case 'CHANGE_IS_FETCHING_RESOURCE': {
      if (payload.isFetching) {
        newState.resources.isFetching.push(true);
      } else {
        newState.resources.isFetching.shift();
      }
      break;
    }
    case 'SET_RESOURCES': {
      newState = {
        ...state,
        resources: {
          ...state.resources,
          data: payload.resources,
        },
      };
      break;
    }
    case 'REMOVE_RESOURCE': {
      delete newState.resources.data[payload.resourceId];
      newState = {
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
      newState = {
        ...state,
        app: {
          ...state.app,
          resource: payload.resource,
        },
      };
      break;
    }
    case 'CHANGE_LOCALE': {
      newState = {
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

  /* eslint-disable no-console */
  console.log('%cAction:', 'color: #76b6c8; font-weight: bold;', action);
  console.log('%cState:', 'color: #2e4551; font-weight: bold;', newState);
  /* eslint-enable no-console */

  return newState;
}

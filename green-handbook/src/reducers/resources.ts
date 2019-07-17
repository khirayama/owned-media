import clone from 'rfdc';

// eslint-disable-next-line node/no-missing-import, node/no-extraneous-import
import { ResourceShape } from 'publisher';

import { Actions } from '../actions/resources';

export interface ResourceState {
  isFetching: boolean[];
  data: ResourceShape | null;
}

export interface State {
  [key: string]: ResourceState;
}

export const initialState: State = {};

export function reducer(state = initialState, action: Actions): State {
  let newState: State = clone()(state);

  switch (action.type) {
    case 'SET_RESOURCE': {
      const resource = action.payload.resource;
      if (newState[resource.key || resource.id]) {
        newState[resource.key || resource.id].data = resource;
      } else {
        newState[resource.key || resource.id] = {
          isFetching: [],
          data: resource,
        };
      }
      break;
    }
    case 'CHANGE_IS_FETCHING_RESOURCE': {
      const resourceId = action.payload.resourceId;
      if (newState[resourceId] && action.payload.isFetching) {
        newState[resourceId].isFetching.push(true);
      } else if (newState[resourceId] && !action.payload.isFetching) {
        newState[resourceId].isFetching.shift();
      } else if (!newState[resourceId] && action.payload.isFetching) {
        newState[resourceId] = {
          isFetching: [true],
          data: null,
        };
      }
      break;
    }
    case 'RESET_RESOURCE': {
      newState = {};
      break;
    }
    default:
  }

  return newState;
}

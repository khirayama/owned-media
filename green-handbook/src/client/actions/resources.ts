import { Action } from 'redux';

// eslint-disable-next-line node/no-missing-import, node/no-extraneous-import
import { ResourceShape } from 'yggdrasil';

export type Actions = SetResource | ChangeIsFetchingResource | ResetResource;

export interface SetResource extends Action<'SET_RESOURCE'> {
  payload: {
    resource: ResourceShape | null;
  };
}

export const setResource = (resource: ResourceShape): SetResource => {
  return {
    type: 'SET_RESOURCE',
    payload: {
      resource,
    },
  };
};

export interface ChangeIsFetchingResource extends Action<'CHANGE_IS_FETCHING_RESOURCE'> {
  payload: {
    resourceId: string;
    isFetching: boolean;
  };
}

export const changeIsFetchingResource = (resourceId: string, isFetching: boolean): ChangeIsFetchingResource => {
  return {
    type: 'CHANGE_IS_FETCHING_RESOURCE',
    payload: {
      resourceId,
      isFetching,
    },
  };
};

export interface ResetResource extends Action<'RESET_RESOURCE'> {}

export const resetResource = (): ResetResource => {
  return {
    type: 'RESET_RESOURCE',
  };
};

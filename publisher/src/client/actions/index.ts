import { Action } from 'redux';

import { ResourceShape, ResourceFullShape } from '../../types';

export interface ChangeIsFetchingResources extends Action<'CHANGE_IS_FETCHING_RESOURCES'> {
  payload: {
    isFetching: boolean;
  };
}

export const changeIsFetchingResources = (isFetching: boolean): ChangeIsFetchingResources => {
  return {
    type: 'CHANGE_IS_FETCHING_RESOURCES',
    payload: {
      isFetching,
    },
  };
};

export interface ChangeIsFetchingResourceFull extends Action<'CHANGE_IS_FETCHING_RESOURCE_FULL'> {
  payload: {
    isFetching: boolean;
  };
}

export const changeIsFetchingResourceFull = (isFetching: boolean): ChangeIsFetchingResourceFull => {
  return {
    type: 'CHANGE_IS_FETCHING_RESOURCE_FULL',
    payload: {
      isFetching,
    },
  };
};

export interface SetResources extends Action<'SET_RESOURCES'> {
  payload: {
    resources: ResourceShape[];
  };
}

export const setResources = (resources: ResourceShape[]): SetResources => {
  return {
    type: 'SET_RESOURCES',
    payload: {
      resources,
    },
  };
};

export interface SetResourceFull extends Action<'SET_RESOURCE_FULL'> {
  payload: {
    resourceFull: ResourceFullShape;
  };
}

export const setResourceFull = (resourceFull: ResourceFullShape): SetResourceFull => {
  return {
    type: 'SET_RESOURCE_FULL',
    payload: {
      resourceFull,
    },
  };
};

export interface RemoveResource extends Action<'REMOVE_RESOURCE'> {
  payload: {
    resourceId: string;
  };
}

export const removeResource = (resourceId: string): RemoveResource => {
  return {
    type: 'REMOVE_RESOURCE',
    payload: {
      resourceId,
    },
  };
};

export interface ChangeLocale extends Action<'CHANGE_LOCALE'> {
  payload: {
    locale: string;
  };
}

export const changeLocale = (locale: string): ChangeLocale => {
  return {
    type: 'CHANGE_LOCALE',
    payload: {
      locale,
    },
  };
};

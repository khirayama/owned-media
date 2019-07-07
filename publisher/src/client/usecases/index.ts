import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ResourceShape, ResourceFullShape } from '../../types';
import {
  changeIsFetchingResources,
  setResources,
  changeIsFetchingResource,
  setResource,
  removeResource,
} from '../actions';
import { Resource as ResourceService } from '../services/Resource';

export const fetchResources = (options?) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(changeIsFetchingResources(true));
    return ResourceService.fetch(options).then((resources: (ResourceShape | ResourceFullShape)[]) => {
      dispatch(setResources(resources as ResourceFullShape[]));
      dispatch(changeIsFetchingResources(false));
    });
  };
};

export const fetchResource = (resourceId: string, options?) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(changeIsFetchingResource(true));
    return ResourceService.find(resourceId, options).then((resource: ResourceShape | ResourceFullShape) => {
      dispatch(setResource(resource as ResourceFullShape));
      dispatch(changeIsFetchingResource(false));
    });
  };
};

export const deleteResource = (resourceId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(changeIsFetchingResources(true));
    return ResourceService.delete(resourceId).then(() => {
      dispatch(removeResource(resourceId));
      dispatch(changeIsFetchingResources(false));
    });
  };
};

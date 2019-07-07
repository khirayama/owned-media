import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ResourceShape, ResourceFullShape } from '../../types';
import {
  changeIsFetchingResources,
  setResources,
  changeIsFetchingResourceFull,
  setResourceFull,
  removeResource,
} from '../actions';
import { Resource as ResourceService } from '../services/Resource';

export const fetchResources = (options?) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(changeIsFetchingResources(true));
    return ResourceService.fetch(options).then((resources: ResourceShape[]) => {
      dispatch(setResources(resources));
      dispatch(changeIsFetchingResources(false));
    });
  };
};

export const fetchResourceFull = (resourceId: string) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(changeIsFetchingResourceFull(true));
    return ResourceService.find(resourceId, { locale: 'all' }).then(resourceFull => {
      dispatch(setResourceFull(resourceFull as ResourceFullShape));
      dispatch(changeIsFetchingResourceFull(false));
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

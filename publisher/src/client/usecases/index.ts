import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ResourceShape } from '../../types';
import { changeIsFetchingResources, setResources, removeResource } from '../actions';
import { Resource as ResourceService } from '../services/Resource';

export const fetchResources = () => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(changeIsFetchingResources(true));
    return ResourceService.fetch().then((resources: ResourceShape[]) => {
      dispatch(setResources(resources));
      dispatch(changeIsFetchingResources(false));
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

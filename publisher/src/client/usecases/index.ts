import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ResourceShape, ResourceWithAllLocalesShape } from '../../types';
import {
  changeIsFetchingResources,
  setResources,
  changeIsFetchingResource,
  setResource,
  removeResource,
} from '../actions';
import { Resource as ResourceService } from '../services/Resource';
import {
  loadConfig,
  resourceWithAllLocalesToResource,
  mergeDeep,
  resourceToPartialResourceWithAllLocales,
} from '../../utils';

const config = loadConfig();

export const createResource = (resource: ResourceWithAllLocalesShape) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(changeIsFetchingResources(true));

    const firstLocale = config.locales[0];
    const otherLocales = config.locales.slice(1, config.locales.length);
    let result: ResourceWithAllLocalesShape = resource;

    ResourceService.create(resourceWithAllLocalesToResource(resource, firstLocale), { locale: firstLocale }).then(
      (newResource: ResourceShape) => {
        result = mergeDeep({}, result, resourceToPartialResourceWithAllLocales(newResource, firstLocale));
        Promise.all(
          otherLocales.map((locale: string) => {
            return ResourceService.update(newResource.id, resourceWithAllLocalesToResource(resource, locale), {
              locale,
            });
          }),
        ).then(res => {
          for (let i = 0; i < otherLocales.length; i += 1) {
            const locale = otherLocales[i];
            const tmpResource: ResourceShape = res[i] as ResourceShape;
            result = mergeDeep({}, result, resourceToPartialResourceWithAllLocales(tmpResource, locale));
          }
          dispatch(setResource(result));
        });
      },
    );
  };
};

export const fetchResources = (options?) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(changeIsFetchingResources(true));
    return ResourceService.fetch(options).then((resources: (ResourceShape | ResourceWithAllLocalesShape)[]) => {
      dispatch(setResources(resources as ResourceWithAllLocalesShape[]));
      dispatch(changeIsFetchingResources(false));
    });
  };
};

export const fetchResource = (resourceId: string, options?) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(changeIsFetchingResource(true));
    return ResourceService.find(resourceId, options).then((resource: ResourceShape | ResourceWithAllLocalesShape) => {
      dispatch(setResource(resource as ResourceWithAllLocalesShape));
      dispatch(changeIsFetchingResource(false));
    });
  };
};

export const updateResource = (resourceId: string, resource: ResourceWithAllLocalesShape) => {
  return (dispatch: ThunkDispatch<{}, {}, Action>) => {
    dispatch(changeIsFetchingResources(true));
    return Promise.all(
      config.locales.map((locale: string) => {
        return ResourceService.update(resourceId, resourceWithAllLocalesToResource(resource, locale), { locale });
      }),
    ).then(res => {
      for (let i = 0; i < config.locales.length; i += 1) {
        const locale = config.locales[i];
        const tmpResource: ResourceShape = res[i] as ResourceShape;
        setResource(mergeDeep({}, resource, resourceToPartialResourceWithAllLocales(tmpResource, locale)));
        dispatch(changeIsFetchingResources(false));
      }
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

import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  Config,
  ResourceShape,
  ResourceWithAllLocalesShape,
  ResourceWithAllLocalesShapeWithRelations,
} from '../../../types';
import {
  changeIsFetchingResources,
  setResources,
  changeIsFetchingResource,
  setResource,
  removeResource,
  setConfig,
} from '../actions';
import { State } from '../reducers';
import { Resource as ResourceService } from '../services/Resource';
import {
  createDefaultResource,
  resourceWithAllLocalesToResource,
  mergeDeep,
  resourceToPartialResourceWithAllLocales,
} from '../../utils';

export const initializeResources = () => {
  return (dispatch: ThunkDispatch<State, void, Action>) => {
    return dispatch(fetchConfig()).then(() => {
      return dispatch(fetchResources());
    });
  };
};

export const initializeNewResource = () => {
  return (dispatch: ThunkDispatch<State, void, Action>, getState: () => State) => {
    return dispatch(fetchConfig()).then(() => {
      const state = getState();
      if (state.config) {
        const defaultResource = createDefaultResource(state.config);
        dispatch(setResource(defaultResource));
      }
    });
  };
};

export const initializeResource = (resourceId: string) => {
  return (dispatch: ThunkDispatch<State, void, Action>, getState: () => State) => {
    return dispatch(fetchConfig()).then(() => {
      const state = getState();
      if (state.config) {
        dispatch(fetchResource(resourceId));
      }
    });
  };
};

export const fetchConfig = () => {
  return (dispatch: ThunkDispatch<State, void, Action>) => {
    return ResourceService.fetchConfig().then((config: Config) => {
      dispatch(setConfig(config));
    });
  };
};

export const createResource = (resource: ResourceWithAllLocalesShape) => {
  return (dispatch: ThunkDispatch<State, void, Action>, getState: () => State) => {
    const state: State = getState();
    dispatch(changeIsFetchingResources(true));

    if (state.config) {
      const config = state.config;
      const firstLocale = config.locales[0];
      const otherLocales = config.locales.slice(1, config.locales.length);
      let result: ResourceWithAllLocalesShapeWithRelations = {
        ...resource,
        relations: [],
      };

      return ResourceService.create(resourceWithAllLocalesToResource(resource, firstLocale), {
        locale: firstLocale,
      }).then((newResource: ResourceShape) => {
        result = mergeDeep({}, result, resourceToPartialResourceWithAllLocales(newResource, firstLocale));
        return Promise.all(
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
      });
    } else {
      return new Promise(resolve => resolve()).then(() => {
        dispatch(changeIsFetchingResources(false));
      });
    }
  };
};

export const fetchResources = () => {
  return (dispatch: ThunkDispatch<State, void, Action>) => {
    dispatch(changeIsFetchingResources(true));
    return ResourceService.fetch({ locale: 'all' }).then(
      (resources: (ResourceShape | ResourceWithAllLocalesShape)[]) => {
        const newResources: { [key: string]: ResourceWithAllLocalesShapeWithRelations } = {};

        Promise.all(
          resources.map((resource: ResourceShape | ResourceWithAllLocalesShape) =>
            ResourceService.fetchRelations(resource.id),
          ),
        ).then(res => {
          for (let i = 0; i < resources.length; i += 1) {
            const resource = resources[i] as ResourceWithAllLocalesShape;
            const relations = res[i] as ResourceShape[];
            const newResource: ResourceWithAllLocalesShapeWithRelations = {
              ...resource,
              relations: relations.map((relation: ResourceShape) => relation.id),
            };
            newResources[newResource.id] = newResource;
          }

          dispatch(setResources(newResources));
          dispatch(changeIsFetchingResources(false));
        });
      },
    );
  };
};

export const fetchResource = (resourceId: string) => {
  return (dispatch: ThunkDispatch<State, void, Action>) => {
    dispatch(changeIsFetchingResource(true));
    return ResourceService.find(resourceId, { locale: 'all' }).then(
      (resource: ResourceShape | ResourceWithAllLocalesShape) => {
        ResourceService.fetchRelations(resource.id).then((res: (ResourceShape | ResourceWithAllLocalesShape)[]) => {
          const result: ResourceWithAllLocalesShapeWithRelations = {
            ...(resource as ResourceWithAllLocalesShape),
            relations: res.map((r: ResourceShape | ResourceWithAllLocalesShape) => r.id),
          };
          dispatch(setResource(result));
          dispatch(changeIsFetchingResource(false));
        });
      },
    );
  };
};

export const updateResource = (resourceId: string, resource: ResourceWithAllLocalesShape) => {
  return (dispatch: ThunkDispatch<State, void, Action>, getState: () => State) => {
    const state = getState();

    dispatch(changeIsFetchingResources(true));

    if (state.config) {
      const config = state.config;

      Promise.all(
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
    } else {
      dispatch(changeIsFetchingResources(false));
    }
  };
};

export const deleteResource = (resourceId: string) => {
  return (dispatch: ThunkDispatch<State, void, Action>) => {
    dispatch(changeIsFetchingResources(true));
    return ResourceService.delete(resourceId).then(() => {
      dispatch(removeResource(resourceId));
      dispatch(changeIsFetchingResources(false));
    });
  };
};

export const createRelations = (resourceId: string, relatedResourceIds: string[]) => {
  return (dispatch: ThunkDispatch<State, void, Action>) => {
    dispatch(changeIsFetchingResources(true));
    return ResourceService.createRelations(resourceId, relatedResourceIds).then(() => {
      dispatch(fetchResource(resourceId)).then(() => {
        dispatch(changeIsFetchingResources(false));
      });
    });
  };
};

export const deleteRelations = (resourceId: string, relatedResourceIds: string[]) => {
  return (dispatch: ThunkDispatch<State, void, Action>) => {
    dispatch(changeIsFetchingResources(true));
    return ResourceService.deleteRelations(resourceId, relatedResourceIds).then(() => {
      dispatch(fetchResource(resourceId)).then(() => {
        dispatch(changeIsFetchingResources(false));
      });
    });
  };
};

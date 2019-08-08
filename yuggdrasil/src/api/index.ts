import { Resource } from './models/Resource';

export { loadConfig } from './utils';

export {
  LocaleObject,
  ResourceType,
  Config,
  ResourceShape,
  ResourceWithAllLocalesShape,
  ResourceRequest,
} from './types';

export {
  fetchResources,
  fetchResource,
  createResource,
  updateResource,
  deleteResource,
  fetchRelatedResources,
  createRelations,
  deleteRelations,
} from './handlers';

export { apiRouter, adminRouter } from './routes';

export function initialize() {
  Resource.init();
}

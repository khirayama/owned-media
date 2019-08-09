import { Resource } from './models/Resource';

export { loadConfig } from './utils';

export { LocaleObject, ResourceType, Config, ResourceShape, ResourceRequest } from './types';

export {
  fetchConfig,
  fetchResources,
  fetchResource,
  createResource,
  updateResource,
  deleteResource,
  fetchRelatedResources,
  createRelations,
  deleteRelations,
  createTargetCountries,
  deleteTargetCountries,
  createExceptedCountries,
  deleteExceptedCountries,
} from './handlers';

export { apiRouter, adminRouter } from './routes';

export function initialize() {
  Resource.init();
}

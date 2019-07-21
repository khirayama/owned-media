import { Resource } from './models/Resource';

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

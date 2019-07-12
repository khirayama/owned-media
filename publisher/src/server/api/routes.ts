import express from 'express';

import {
  fetchResources,
  fetchResource,
  createResource,
  updateResource,
  deleteResource,
  fetchRelatedResources,
  createRelations,
  deleteRelations,
} from './handlers';

export const api: express.Application = express();
api
  .get('/resources', fetchResources)
  .get('/resources/:id', fetchResource)
  .get('/resources/:id/relations', fetchRelatedResources)
  .post('/resources', createResource)
  .post('/resources/:id/relations', createRelations)
  .delete('/resources/:id/relations', deleteRelations)
  .put('/resources/:id', updateResource)
  .delete('/resources/:id', deleteResource);

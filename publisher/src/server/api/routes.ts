import express from 'express';

import {
  fetchResources,
  fetchResource,
  createResource,
  updateResource,
  deleteResource,
  fetchRelatedResources,
} from './handlers';

export const api: express.Application = express();
api
  .get('/resources', fetchResources)
  .get('/resources/:id', fetchResource)
  .get('/resources/:id/relations', fetchRelatedResources)
  .post('/resources', createResource)
  .put('/resources/:id', updateResource)
  .delete('/resources/:id', deleteResource);

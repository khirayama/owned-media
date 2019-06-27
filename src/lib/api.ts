import express from 'express';

import { fetchResources, fetchResource, createResource, updateResource, deleteResource } from 'lib/handlers';

export const api: express.Application = express();
api
  .get('/resources', fetchResources)
  .post('/resources', createResource)
  .get('/resources/:id', fetchResource)
  .put('/resources/:id', updateResource)
  .delete('/resources/:id', deleteResource);

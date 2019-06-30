import express from 'express';

import { fetchResources, fetchResource, createResource, updateResource, deleteResource } from 'lib/handlers';

export const api: express.Application = express();
api.get('/resources', fetchResources).get('/resources/:id', fetchResource);

export const admin: express.Application = express();
admin
  .post('/resources', createResource)
  .put('/resources/:id', updateResource)
  .delete('/resources/:id', deleteResource);
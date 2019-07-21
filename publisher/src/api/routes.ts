import express from 'express';

import {
  fetchConfig,
  fetchResources,
  fetchResource,
  createResource,
  updateResource,
  deleteResource,
  fetchRelatedResources,
  createRelations,
  deleteRelations,
} from './handlers';

export const apiRouter: express.Application = express();
apiRouter
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/config', fetchConfig)
  .get('/resources', fetchResources)
  .get('/resources/:id', fetchResource)
  .get('/resources/:id/relations', fetchRelatedResources);

export const adminRouter: express.Application = express();
adminRouter
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .post('/resources', createResource)
  .post('/resources/:id/relations', createRelations)
  .delete('/resources/:id/relations', deleteRelations)
  .put('/resources/:id', updateResource)
  .delete('/resources/:id', deleteResource);

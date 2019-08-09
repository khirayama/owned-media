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
  fetchTargetCountries,
  createTargetCountries,
  deleteTargetCountries,
  fetchExceptedCountries,
  createExceptedCountries,
  deleteExceptedCountries,
} from './handlers';

export const apiRouter: express.Application = express();
apiRouter
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/config', fetchConfig)
  .get('/resources', fetchResources)
  .get('/resources/:id', fetchResource)
  .get('/resources/:id/relations', fetchRelatedResources)
  .get('/resources/:id/target-countries', fetchTargetCountries)
  .get('/resources/:id/excepted-countries', fetchExceptedCountries);

export const adminRouter: express.Application = express();
adminRouter
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .post('/resources', createResource)
  .post('/resources/:id/relations', createRelations)
  .delete('/resources/:id/relations', deleteRelations)
  .post('/resources/:id/target-countries', createTargetCountries)
  .delete('/resources/:id/target-countries', deleteTargetCountries)
  .post('/resources/:id/excepted-contries', createExceptedCountries)
  .delete('/resources/:id/excepted-countries', deleteExceptedCountries)
  .put('/resources/:id', updateResource)
  .delete('/resources/:id', deleteResource);

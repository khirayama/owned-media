import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';

import { createResourceHandler, updateResourceHandler, deleteResourceHandler } from './handlers/resourceHandlers';
import {
  addResourceContentHandler,
  updateResourceContentHandler,
  deleteResourceContentHandler,
} from './handlers/resourceContentHandlers';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const resourceRouter = new express.Router();
resourceRouter
  .post('/', createResourceHandler)
  .patch('/:resourceId', updateResourceHandler)
  .delete('/:resourceId', deleteResourceHandler)
  .post('/:resourceId/contents', addResourceContentHandler)
  .patch('/:resourceId/contents/:contentId', updateResourceContentHandler)
  .delete('/:resourceId/contents/:contentId', deleteResourceContentHandler);

app.use('/resources', resourceRouter);

(async () => {
  await createConnection();

  app.listen(3000);
})();

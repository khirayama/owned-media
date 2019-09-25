import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';

import { createResourceHandler, updateResourceHandler, deleteResourceHandler } from './handlers/resourceHandlers';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const resourceRouter = new express.Router();
resourceRouter
  .post('/', createResourceHandler)
  .patch('/:id', updateResourceHandler)
  .delete('/:id', deleteResourceHandler);

app.use('/resources', resourceRouter);

(async () => {
  await createConnection();

  app.listen(3000);
})();

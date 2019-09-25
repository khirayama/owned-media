import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';

import { createResourceHandler, updateResourceHandler } from './handlers/resourceHandlers';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const resourceRouter = new express.Router();
resourceRouter.post('/', createResourceHandler).put('/:id', updateResourceHandler);

app.get('/resources', resourceRouter);

(async () => {
  await createConnection();

  app.listen(3000);
})();

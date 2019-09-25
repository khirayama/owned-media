import * as typeorm from 'typeorm';
import * as mocksHttp from 'node-mocks-http';

import { createResourceHandler } from './resourceHandlers';

beforeAll(async () => {
  const ormconfig = require('../../ormconfig.test');
  await typeorm.createConnection(ormconfig);
});

afterAll(async () => {
  const connection = await typeorm.getConnection();
  await connection.close();
});

describe('createResourceHandler', () => {
  test('Create resource.', async () => {
    const req = mocksHttp.createRequest({
      method: 'GET',
      url: '/',
      body: {
        key: 'acdacd___---',
      },
    });
    const res = mocksHttp.createResponse();

    await createResourceHandler(req, res);
    console.log(res.statusCode);
    console.log(res._getData());
  });
});

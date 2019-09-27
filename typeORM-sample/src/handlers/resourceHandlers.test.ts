import * as typeorm from 'typeorm';
import * as mocksHttp from 'node-mocks-http';

import { createResourceHandler } from './resourceHandlers';

beforeAll(async () => {
  const ormconfig = require('../../ormconfig.test');
  const connection = await typeorm.createConnection(ormconfig);
  await connection.dropDatabase();
  await connection.synchronize();
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
        key: 'sample-resource',
        type: 'note',
      },
    });
    const res = mocksHttp.createResponse();

    await createResourceHandler(req, res);
    const resource = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(resource).toEqual({
      key: 'sample-resource',
      type: 'note',
      id: resource.id,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    });
  });
});

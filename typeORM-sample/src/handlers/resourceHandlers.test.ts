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
    const response = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(response).toEqual({
      key: 'sample-resource',
      type: 'note',
      id: response.id,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    });
  });
  test('Try to create resource with unvalid key.', async () => {
    const req = mocksHttp.createRequest({
      method: 'GET',
      url: '/',
      body: {
        key: 'sample_resource',
        type: 'note',
      },
    });
    const res = mocksHttp.createResponse();

    await createResourceHandler(req, res);
    const response = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(response).toEqual({
      message: 'Validation Failed',
      errors: [
        {
          field: 'key',
          message: 'This resource key(sample_resource) is invalid key',
        },
      ],
    });
  });
});

import * as mocksHttp from 'node-mocks-http';

import { connectDatabase } from '../testutils';
import { createResourceHandler } from './resourceHandlers';

beforeAll(async () => {
  await connectDatabase();
});

describe('createResourceHandler', () => {
  test('Create resource.', async () => {
    const req = mocksHttp.createRequest({
      method: 'GET',
      url: '/',
      body: {
        key: 'create-resource-handler',
        type: 'note',
      },
    });
    const res = mocksHttp.createResponse();

    await createResourceHandler(req, res);
    const response = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(response).toEqual({
      key: 'create-resource-handler',
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
        key: 'create_resource_handler',
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
          message: 'This resource key(create_resource_handler) is invalid key',
        },
      ],
    });
  });
  test('Create resource with unsupported resource type.', async () => {
    const req = mocksHttp.createRequest({
      method: 'GET',
      url: '/',
      body: {
        key: 'create-resource-handler',
        type: 'nota',
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
          field: 'type',
          message: 'This resource type(nota) does not be supportted.',
        },
      ],
    });
  });
  test('Create resource with existing key.', async () => {
    await createResourceHandler(
      mocksHttp.createRequest({
        method: 'GET',
        url: '/',
        body: {
          key: 'create-resource-handler-with-existing-key',
          type: 'note',
        },
      }),
      mocksHttp.createResponse(),
    );

    const req = mocksHttp.createRequest({
      method: 'GET',
      url: '/',
      body: {
        key: 'create-resource-handler-with-existing-key',
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
          message: 'This resource key is already existing.',
        },
      ],
    });
  });
});

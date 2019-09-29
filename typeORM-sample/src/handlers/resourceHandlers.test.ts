import * as mocksHttp from 'node-mocks-http';

import { connectDatabase } from '../testutils';
import { createResourceHandler, updateResourceHandler, deleteResourceHandler } from './resourceHandlers';

beforeAll(async () => {
  await connectDatabase();
});

describe('createResourceHandler', () => {
  test('Create resource.', async () => {
    const req = mocksHttp.createRequest({
      method: 'POST',
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
      method: 'POST',
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
      method: 'POST',
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
        method: 'POST',
        body: {
          key: 'create-resource-handler-with-existing-key',
          type: 'note',
        },
      }),
      mocksHttp.createResponse(),
    );

    const req = mocksHttp.createRequest({
      method: 'POST',
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

describe('updateResourceHandler', () => {
  test('Update resource.', async () => {
    const createdRes = mocksHttp.createResponse();
    await createResourceHandler(
      mocksHttp.createRequest({
        method: 'POST',
        body: {
          key: 'update-resource-handler',
          type: 'note',
        },
      }),
      createdRes,
    );
    const resource = createdRes._getJSONData();

    const req = mocksHttp.createRequest({
      method: 'PATCH',
      params: {
        id: resource.id,
      },
      body: {
        key: 'update-resource-handler-updated',
        type: 'note',
      },
    });
    const res = mocksHttp.createResponse();

    await updateResourceHandler(req, res);
    const response = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(response).toEqual({
      key: 'update-resource-handler-updated',
      type: 'note',
      id: response.id,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    });
  });

  test('Update resource with invalid key.', async () => {
    const createdRes = mocksHttp.createResponse();
    await createResourceHandler(
      mocksHttp.createRequest({
        method: 'POST',
        body: {
          key: 'update-resource-handler-with-invalid-key',
          type: 'note',
        },
      }),
      createdRes,
    );
    const resource = createdRes._getJSONData();

    const req = mocksHttp.createRequest({
      method: 'PATCH',
      params: {
        id: resource.id,
      },
      body: {
        key: 'update-resource-handler-updated-with-invalid-key_',
        type: 'note',
      },
    });
    const res = mocksHttp.createResponse();

    await updateResourceHandler(req, res);
    const response = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(response).toEqual({
      message: 'Validation Failed',
      errors: [
        {
          field: 'key',
          message: 'This resource key(update-resource-handler-updated-with-invalid-key_) is invalid key',
        },
      ],
    });
  });
});

describe('deleteResourceHandler', () => {
  test('Delete resource.', async () => {
    const createdRes = mocksHttp.createResponse();
    await createResourceHandler(
      mocksHttp.createRequest({
        method: 'POST',
        body: {
          key: 'delete-resource-handler',
          type: 'note',
        },
      }),
      createdRes,
    );
    const resource = createdRes._getJSONData();

    const req = mocksHttp.createRequest({
      method: 'DELETE',
      params: {
        id: resource.id,
      },
    });
    const res = mocksHttp.createResponse();

    await deleteResourceHandler(req, res);
    const response = res._getJSONData();
    expect(res.statusCode).toBe(204);
    expect(response).toEqual({});
  });
});

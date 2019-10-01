import * as mocksHttp from 'node-mocks-http';

import { connectDatabase } from '../testutils';
import { createResourceHandler } from './resourceHandlers';
import { addResourceContentHandler } from './resourceContentHandlers';

beforeAll(async () => {
  await connectDatabase();
});

describe('createResourceContentHandler', () => {
  test('Add resource content.', async () => {
    const resourceReq = mocksHttp.createRequest({
      method: 'POST',
      body: {
        key: 'create-resource-content-handler',
      },
    });
    const resourceRes = mocksHttp.createResponse();

    await createResourceHandler(resourceReq, resourceRes);
    const resource = resourceRes._getJSONData();

    const req = mocksHttp.createRequest({
      method: 'POST',
      params: {
        resourceId: resource.id,
      },
      body: {
        name: 'Sample Resource Content Name',
        body: 'Sample Resource Content Body',
      },
    });
    const res = mocksHttp.createResponse();
    await addResourceContentHandler(req, res);
    const resourceContent = res._getJSONData();

    expect(res.statusCode).toBe(201);
    expect(resourceContent).toEqual({
      id: resourceContent.id,
      locale: 'ja_JP',
      name: 'Sample Resource Content Name',
      body: 'Sample Resource Content Body',
      createdAt: resourceContent.createdAt,
      updatedAt: resourceContent.updatedAt,
    });
  });
});

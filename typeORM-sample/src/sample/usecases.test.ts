import * as typeorm from 'typeorm';

import { createResource, updateResource } from './usecases';

const ormconfig = require('../../ormconfig.test');

beforeAll(async () => {
  await typeorm.createConnection(ormconfig);
});

beforeEach(async () => {
  const connection = await typeorm.getConnection();
  await connection.dropDatabase();
  await connection.synchronize();
});

afterAll(async () => {
  const connection = await typeorm.getConnection();
  await connection.close();
});

describe('createResource', () => {
  test('Create resource.', async () => {
    const resource = await createResource({
      key: 'sample-resource',
      type: 'note',
    });
    expect(resource).toEqual({
      id: resource.id,
      key: 'sample-resource',
      type: 'note',
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    });
  });
  test('Try to create resource with unvalid key.', async () => {
    const createResourcePromise = createResource({
      key: 'sample_resource',
      type: 'note',
    });
    await expect(createResourcePromise).rejects.toThrow();
  });
  test('Create resource with unsupported resource type.', async () => {
    const createResourcePromise = createResource({
      key: 'sample-resource',
      type: 'nota',
    });
    await expect(createResourcePromise).rejects.toThrow();
  });
  test('Create resource with existing key.', async () => {
    await createResource({
      key: 'sample-resource',
      type: 'note',
    });
    const createResourcePromise = createResource({
      key: 'sample-resource',
      type: 'note',
    });
    await expect(createResourcePromise).rejects.toThrow();
  });
});

describe('updateResource', () => {
  test('Update resource.', async () => {
    let resource = await createResource({
      key: 'sample-resource',
      type: 'note',
    });
    resource = await updateResource(resource.id, { key: 'new-sample-resource' });
    expect(resource).toEqual({
      id: resource.id,
      key: 'new-sample-resource',
      type: 'note',
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    });
  });
});

import * as typeorm from 'typeorm';

import { createResource, updateResource, deleteResource } from './resource';
import { addResourceContent } from './resourceContent';

beforeAll(async () => {
  const ormconfig = require('../../../ormconfig.test');
  await typeorm.createConnection(ormconfig);
});

afterAll(async () => {
  const connection = await typeorm.getConnection();
  await connection.close();
});

beforeEach(async () => {
  const connection = await typeorm.getConnection();
  await connection.dropDatabase();
  await connection.synchronize();
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
    await expect(createResourcePromise).rejects.toThrowError();
  });
  test('Create resource with unsupported resource type.', async () => {
    const createResourcePromise = createResource({
      key: 'sample-resource',
      type: 'nota',
    });
    await expect(createResourcePromise).rejects.toThrowError();
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
    await expect(createResourcePromise).rejects.toThrowError();
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
  test('Update resource with invalid key.', async () => {
    let resource = await createResource({
      key: 'sample-resource',
      type: 'note',
    });
    let updateResourcePromise = updateResource(resource.id, { key: 'sample_resource' });
    await expect(updateResourcePromise).rejects.toThrowError();

    updateResourcePromise = updateResource(resource.id, { key: null });
    await expect(updateResourcePromise).rejects.toThrowError();
  });
});

describe('updateResource', () => {
  test('Delete resource.', async () => {
    const resource = await createResource({
      key: 'sample-resource',
      type: 'note',
    });
    await deleteResource(resource.id);
    const createResourcePromise = createResource({
      key: 'sample-resource',
      type: 'note',
    });
    await expect(createResourcePromise).resolves.not.toThrowError();
  });
});

describe('addResourceContent', () => {
  test('Create resource content.', async () => {
    const resource = await createResource({
      key: 'sample-resource',
      type: 'note',
    });
    const resourceContent = await addResourceContent(resource.id, {
      name: 'Sample Resource',
      body: `# Sample Resource
sample text`,
    });
    expect(resourceContent).toEqual({
      id: resourceContent.id,
      locale: 'ja_JP',
      name: 'Sample Resource',
      body: `# Sample Resource
sample text`,
      createdAt: resourceContent.createdAt,
      updatedAt: resourceContent.updatedAt,
    });
  });
  test('Create resource content with locale.', async () => {});
});

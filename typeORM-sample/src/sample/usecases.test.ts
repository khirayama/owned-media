import * as typeorm from 'typeorm';

import { isValidKey, createResource } from './usecases';
import { ormconfig } from '../../ormconfig.test';
// import { Resource } from '../entity/Resource';

beforeAll(async () => {
  const connection = await typeorm.createConnection(ormconfig);
  await connection.dropDatabase();
  await connection.synchronize();
});

afterAll(async () => {
  const connection = await typeorm.getConnection();
  await connection.close();
});

describe('isValidKey', () => {
  test('Normal usage.', () => {
    // true
    expect(isValidKey('samplekey')).toBeTruthy();
    expect(isValidKey('sample-key')).toBeTruthy();
    expect(isValidKey('sample-key-1')).toBeTruthy();
    expect(isValidKey('1-sample-key')).toBeTruthy();
    // false
    expect(isValidKey('Samplekey')).toBeFalsy();
    expect(isValidKey('sample_key')).toBeFalsy();
    expect(isValidKey('sample!key')).toBeFalsy();
  });
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
  // await test('Create resource with contents, meta and attributes.', async () => {
  //   const resource = await createResource({
  //     key: 'sample-resource-with-contents',
  //     type: 'note',
  //     contents: {
  //       name: 'Sample Resource',
  //       body: 'Sample Body',
  //     },
  //     meta: {
  //       title: 'title',
  //       description: 'description',
  //       keywords: 'keyword1,keyword2',
  //     },
  //     attributes: {
  //       sampleAttribute1: 'sample value 1',
  //       sampleAttribute2: 'sample value 2',
  //     },
  //   });
  //   expect(resource).toEqual({
  //     id: resource.id,
  //     key: 'sample-resource',
  //     type: 'note',
  //     contents: {
  //       name: 'Sample Resource',
  //       body: 'Sample Body',
  //     },
  //     meta: {
  //       title: 'title',
  //       description: 'description',
  //       keywords: 'keyword1,keyword2',
  //     },
  //     attributes: {
  //       sampleAttribute1: 'sample value 1',
  //       sampleAttribute2: 'sample value 2',
  //     },
  //     createdAt: resource.createdAt,
  //     updatedAt: resource.updatedAt,
  //   });
  // });
  test('Create resource with locale.', async () => {});
  test('Create resource with unsupported resource type.', async () => {});
  test('Create resource with unsupported locale.', async () => {});
  test('Create resource with same locale and key.', async () => {});
  test('Create resource with another locale and same key.', async () => {});
  test('Create resource with same locale and key but having update for key and attributes.', async () => {});
});

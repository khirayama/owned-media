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
    // valid
    expect(isValidKey('samplekey')).toBeTruthy();
    expect(isValidKey('sample-key')).toBeTruthy();
    expect(isValidKey('sample-key-1')).toBeTruthy();
    expect(isValidKey('1-sample-key')).toBeTruthy();
    // unvalid
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
  test('Create resource with unsupported resource type.', async () => {});
});

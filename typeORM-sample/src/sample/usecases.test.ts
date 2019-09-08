import * as typeorm from 'typeorm';

import { createResource } from './usecases';
import { ormconfig } from '../../ormconfig.test';
// import { Resource } from '../entity/Resource';

beforeAll(async () => {
  const connection = await typeorm.createConnection(ormconfig);
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
  test('Create resource with locale.', async () => {});
  test('Create resource with contents, meta and attributes.', async () => {});
  test('Create resource with unsupported resource type.', async () => {});
  test('Create resource with unsupported locale.', async () => {});
  test('Create resource with same locale and key.', async () => {});
  test('Create resource with another locale and same key.', async () => {});
  test('Create resource with same locale and key but having update for key and attributes.', async () => {});
});

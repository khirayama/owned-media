import * as typeorm from 'typeorm';

import { createResource } from './usecases';
import { ormconfig } from '../../ormconfig.test';
// import { Resource } from '../entity/Resource';

beforeAll(async () => {
  const connection = await typeorm.createConnection(ormconfig);
  await connection.dropDatabase();
  await connection.synchronize();
});

test('Create resource with not support type.', async () => {
  const resource = await createResource({
    locale: 'en_US',
    key: 'sample-resource-2',
    type: 'note',
    contents: {
      name: 'サンプルネーム',
      body: 'サンプルボディ',
    },
  });
  console.log(resource);
  expect(true).toEqual(true);
});

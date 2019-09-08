import * as typeorm from 'typeorm';

import { createResource } from './usecases';
import { ormconfig } from '../../ormconfig.test';
// import { Resource } from '../entity/Resource';

beforeAll(async () => {
  await typeorm.createConnection(ormconfig);
});

test('Create resource with not support type.', async () => {
  // not support type
  await createResource({
    locale: 'en_US',
    key: 'sample-resource-2',
    type: 'note',
    contents: {
      name: 'サンプルネーム',
      body: 'サンプルボディ',
    },
  });
  expect(true).toEqual(true);
});

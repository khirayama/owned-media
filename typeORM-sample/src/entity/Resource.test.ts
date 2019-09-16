import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';

import { Resource } from './Resource';

const ormconfig = require('../../ormconfig.test');

beforeAll(async () => {
  await typeorm.createConnection(ormconfig);
});

afterAll(async () => {
  const connection = await typeorm.getConnection();
  await connection.close();
});

describe('Resource', () => {
  describe('Validation', () => {
    test('Validation key', async () => {
      const resource = await new Resource();
      const errors = await classValidator.validate(resource);
      console.log(errors);
      await expect(errors).toEqual({});
      resource.key = '';
    });
    test('Validation key', async () => {
      let savePromise: Promise<any>;
      const connection = await typeorm.getConnection();
      const resource = await new Resource();

      resource.key = '';
      savePromise = connection.manager.save(resource);
      await expect(savePromise).rejects.toThrow();

      resource.key = 'sample_resource';
      savePromise = connection.manager.save(resource);
      await expect(savePromise).rejects.toThrow();
    });
  });
});

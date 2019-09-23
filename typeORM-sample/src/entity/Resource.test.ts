import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';

import { Resource } from './Resource';

beforeAll(async () => {
  const ormconfig = require('../../ormconfig.test');
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
      await expect(errors).toEqual([
        {
          target: {},
          value: undefined,
          property: 'key',
          children: [],
          constraints: {
            matches: 'This resource key($value) is invalid key',
            isNotEmpty: 'key should not be empty',
          },
        },
        {
          target: {},
          value: undefined,
          property: 'type',
          children: [],
          constraints: {
            matches: 'This resource type($value) does not be supportted.',
            isNotEmpty: 'type should not be empty',
          },
        },
      ]);
    });
  });
});

import * as typeorm from 'typeorm';

import { createResource } from './resource';
import { createResourceContent } from './resourceContent';

beforeEach(async () => {
  const connection = await typeorm.getConnection();
  await connection.dropDatabase();
  await connection.synchronize();
});

describe('createResourceContent', () => {
  test('Create resource content.', async () => {
    const resource = await createResource({
      key: 'sample-resource',
      type: 'note',
    });
    const resourceContent = await createResourceContent(resource.id, {
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

import * as typeorm from 'typeorm';

import { resourceTypes, supportLocales } from '../../config';
import { Resource } from '../entity/Resource';

export type ResourceCreateParams = {
  key: string;
  type?: string;
};

export function isValidKey(key: string) {
  return /^[a-z0-9|-]+$/.test(key);
}

export async function createResource(params: ResourceCreateParams): Promise<any> {
  const connection = await typeorm.getConnection();
  const resourceRepository = await connection.getRepository(Resource);

  const key = params.key;
  const resourceType = params.type ? params.type : resourceTypes[0].name;

  // Validations
  if (!isValidKey(key)) {
    throw new Error(`${key} is invalid key.`);
  }

  const resourceTypeNames = resourceTypes.map(resourceType => resourceType.name);
  const isNotSupportedResourceType = resourceTypeNames.indexOf(resourceType) === -1;
  if (isNotSupportedResourceType) {
    console.log(`Not support ${resourceType} as resource type.`);
    return;
  }

  const isExistingResourceWithSameKey = !!(await resourceRepository
    .createQueryBuilder('resource')
    .select('COUNT(`id`)')
    .where('resource.key = :key')
    .setParameters({ key })
    .getCount());
  if (isExistingResourceWithSameKey) {
    console.log(`Existing resource with this key and locale.
If new resource is wanted to create, please change key.
If another locale resource is wanted to create, please change locale.`);
    return;
  }

  const resource = new Resource();
  resource.key = key;
  resource.type = resourceType;
  await connection.manager.save(resource);

  return resource;
}

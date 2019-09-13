import * as typeorm from 'typeorm';

import { resourceTypes } from '../../config';
import { Resource } from '../entity/Resource';

export type ResourceCreateParams = {
  key: string;
  type?: string;
};

export function isValidKey(key: string) {
  return /^[a-z0-9|-]+$/.test(key);
}

export async function createResource(params: ResourceCreateParams): Promise<Resource> {
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
    throw new Error(`Not support ${resourceType} as resource type.`);
  }

  const isExistingResourceWithSameKey = !!(await resourceRepository
    .createQueryBuilder('resource')
    .select('COUNT(`id`)')
    .where('resource.key = :key')
    .setParameters({ key })
    .getCount());
  if (isExistingResourceWithSameKey) {
    throw new Error(`Existing resource with ${key} as key. If new resource is wanted to create, please change key.`);
  }

  const resource = new Resource();
  resource.key = key;
  resource.type = resourceType;
  await connection.manager.save(resource);

  return resource;
}

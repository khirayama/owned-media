import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';

import { resourceTypes } from '../../config';
import { Resource } from '../entity/Resource';

export type ResourceCreateParams = {
  key: string;
  type?: string;
};

export async function createResource(params: ResourceCreateParams): Promise<Resource> {
  const connection = await typeorm.getConnection();
  const resourceRepository = await connection.getRepository(Resource);

  const key = params.key;
  const resourceType = params.type ? params.type : resourceTypes[0].name;

  // Validations
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

  const errors = await classValidator.validate(resource);
  if (errors.length) {
    for (const err of errors) {
      throw new Error(err.constraints.matches);
    }
  } else {
    await connection.manager.save(resource);
  }

  return resource;
}

export type ResourceUpdateParams = {
  key?: string;
  type?: string;
};

export async function updateResource(resourceId: string, params: ResourceUpdateParams): Promise<Resource> {
  const connection = await typeorm.getConnection();
  const resourceRepository = await connection.getRepository(Resource);

  await resourceRepository.update({ id: resourceId }, params);
  const resource = await resourceRepository.findOne(resourceId);

  return resource;
}

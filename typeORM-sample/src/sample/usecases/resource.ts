import * as typeorm from 'typeorm';

import { resourceTypes } from '../../../config';
import { Resource } from '../../entity/Resource';
import { partialAssign, save } from './utils';

export type ResourceCreateParams = {
  key: string;
  type?: string;
};

export async function createResource(params: ResourceCreateParams): Promise<Resource> {
  const initialParams = {
    type: resourceTypes[0].name,
  };

  const resource = new Resource();
  partialAssign(resource, Object.assign(initialParams, params));

  return await save(resource);
}

export type ResourceUpdateParams = {
  key?: string;
  type?: string;
};

export async function updateResource(resourceId: string, params: ResourceUpdateParams): Promise<Resource> {
  const connection = await typeorm.getConnection();

  let resource = await connection.manager.findOne(Resource, resourceId);

  if (!resource) {
    throw new Error('Not found.');
  }

  partialAssign(resource, params);

  return await save(resource);
}

export async function deleteResource(resourceId: string): Promise<void> {
  const connection = await typeorm.getConnection();

  let resource = await connection.manager.findOne(Resource, resourceId);

  if (!resource) {
    throw new Error('Not found.');
  }

  // https://stackoverflow.com/questions/54246615/what-s-the-difference-between-remove-and-delete
  await connection.manager.delete(Resource, resourceId);
  // TODO: Remove relations
}

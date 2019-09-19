import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';

import { resourceTypes } from '../../../config';
import { Resource } from '../../entity/Resource';

function partialAssign(obj, params) {
  for (const key of Object.keys(params)) {
    obj[key] = params[key] !== undefined ? params[key] : obj[key];
  }
}

async function save(obj) {
  const errors = await classValidator.validate(obj);
  if (errors.length) {
    for (const err of errors) {
      throw new Error(err.constraints.matches);
    }
  } else {
    const connection = await typeorm.getConnection();
    await connection.manager.save(obj);
    return obj;
  }
}

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

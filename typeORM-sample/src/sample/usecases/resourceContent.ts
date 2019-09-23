import * as typeorm from 'typeorm';

import { supportLocales } from '../../../config';
import { Resource } from '../../entity/Resource';
import { ResourceContent } from '../../entity/ResourceContent';
import { partialAssign, save } from './utils';

export type ResourceContentCreateParams = {
  locale?: string;
  name?: string;
  body?: string;
};

export async function createResourceContent(
  resourceId: string,
  params: ResourceContentCreateParams,
): Promise<ResourceContent> {
  const connection = await typeorm.getConnection();

  const initialParams = {
    locale: supportLocales[0],
    name: '',
    body: '',
  };

  let resource = await connection.manager.findOne(Resource, resourceId);

  const resourceContent = new ResourceContent();
  resourceContent.resource = resource;
  // TODO: Generate body url for markdown
  partialAssign(resourceContent, Object.assign(initialParams, params));

  return await save(resourceContent);
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

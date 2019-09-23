import * as path from 'path';

import * as typeorm from 'typeorm';
import * as fsExtra from 'fs-extra';

import { supportLocales } from '../../../config';
import { Resource } from '../../entity/Resource';
import { ResourceContent } from '../../entity/ResourceContent';
import { partialAssign, save } from './utils';

const ROOT_PATH = path.resolve(process.cwd());

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
  let resource = await connection.manager.findOne(Resource, resourceId);

  const initialParams = {
    locale: supportLocales[0],
    name: '',
    body: '',
  };

  const resourceContent = new ResourceContent();
  const bodyFileName = `${resource.key}_${resourceContent.locale}.md`;

  partialAssign(resourceContent, Object.assign(initialParams, params));
  resourceContent.resource = resource;
  resourceContent.body = bodyFileName;

  const bodyPath = path.resolve(ROOT_PATH, bodyFileName);
  fsExtra.outputFileSync(bodyPath, params.body);

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

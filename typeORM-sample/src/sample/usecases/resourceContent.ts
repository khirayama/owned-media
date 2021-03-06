import * as path from 'path';

import * as fsExtra from 'fs-extra';

import { supportLocales } from '../../../config';
import { Resource } from '../../entity/Resource';
import { ResourceContent } from '../../entity/ResourceContent';
import { partialAssign, save } from './utils';

const ROOT_PATH = path.resolve(process.cwd());

export type ResourceContentAddParams = {
  locale?: string;
  name?: string;
  body?: string;
};

export async function addResourceContent(
  resource: Resource,
  params: ResourceContentAddParams,
): Promise<ResourceContent> {
  const initialParams = {
    locale: supportLocales[0],
    name: '',
    body: '',
  };

  const resourceContent = new ResourceContent();
  partialAssign(resourceContent, Object.assign(initialParams, params));

  const bodyFileName = `${resource.key}_${resourceContent.locale}.md`;
  resourceContent.body = bodyFileName;

  const bodyPath = path.resolve(ROOT_PATH, bodyFileName);
  fsExtra.outputFileSync(bodyPath, params.body);

  resource.contents = resource.contents ? [...resource.contents, resourceContent] : [resourceContent];

  await save(resource);
  await save(resourceContent);

  resourceContent.body = params.body;
  return resourceContent;
}

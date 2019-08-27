import * as typeorm from "typeorm";

import { reservedResourceFields } from './var';
import { resourceTypes } from './config';
import { Resource } from './src/entity/Resource';
import { ResourceContent } from './src/entity/ResourceContent';
import { ResourceMeta } from './src/entity/ResourceMeta';
import { ResourceAttribute } from './src/entity/ResourceAttribute';

export type ResourceCreateParams = {
  key: string;
  type?: string;
  name?: string;
  body?: string;
  [key: string]: any; // For attributes
};

export async function createResource(locale: string, params: ResourceCreateParams) {
  const connection = typeorm.getConnection();

  const key = params.key;

  const content = new ResourceContent();
  content.locale = locale;
  content.name = params.name;
  // TODO: Make markdown file with params.body
  content.body = `/contents/${key}-${locale}.md`;
  await connection.manager.save(content);

  const resource = new Resource();
  resource.key = key;
  resource.contents = [content];
  resource.type = params.type ? params.type : resourceTypes[0].name;
  await connection.manager.save(resource);

  const attributeKeys = Object.keys(params);
  for (const attributeKey of attributeKeys) {
    if (reservedResourceFields.indexOf(attributeKey) === -1) {
      const resourceAttribute = new ResourceAttribute();
      resourceAttribute.key = attributeKey;
      resourceAttribute.value = params[attributeKey];
      resourceAttribute.type = typeof params[attributeKey];
      await connection.manager.save(resourceAttribute);
      resource.attributes.push(resourceAttribute);
      await connection.manager.save(resource);
    }
  }
}

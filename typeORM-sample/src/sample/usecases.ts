import * as typeorm from 'typeorm';
import * as fsExtra from 'fs-extra';

import { reservedResourceFields } from './var';
import { resourceTypes, contentsDir, supportLocales } from '../../config';
import { Resource } from '../entity/Resource';
import { ResourceContent } from '../entity/ResourceContent';
import { ResourceMeta } from '../entity/ResourceMeta';
import { ResourceAttribute } from '../entity/ResourceAttribute';

export type ResourceCreateParams = {
  key: string;
  locale?: string;
  type?: string;
  contents?: {
    name?: string;
    body?: string;
  };
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  attributes?: {
    [key: string]: boolean | number | string | Date;
  };
};

export function isValidKey(key: string) {
  return /^[a-z0-9|-]+$/.test(key);
}

export async function createResource(params: ResourceCreateParams): Promise<Resource> {
  const connection = await typeorm.getConnection();
  const resourceRepository = await connection.getRepository(Resource);

  const key = params.key;
  const locale = params.locale || supportLocales[0];
  const resourceType = params.type ? params.type : resourceTypes[0].name;

  // Validation
  if (!isValidKey(key)) {
    let message = `${key} is invalid key.`;
    throw new Error(message);
  }

  const isNotSupportedLocale = supportLocales.indexOf(locale) === -1;
  if (isNotSupportedLocale) {
    console.log(`Not support ${locale} as locale.`);
    return;
  }

  const resourceTypeNames = resourceTypes.map(resourceType => resourceType.name);
  const isNotSupportedResourceType = resourceTypeNames.indexOf(resourceType) === -1;
  if (isNotSupportedResourceType) {
    console.log(`Not support ${resourceType} as resource type.`);
    return;
  }

  const isExistingResourceWithSameKeyAndSameLocale = !!(await resourceRepository
    .createQueryBuilder('resource')
    .select('COUNT(`id`)')
    .leftJoinAndSelect('resource.contents', 'resource_contents')
    .leftJoinAndSelect('resource.meta', 'resource_meta', 'resource_meta.locale = resource_contents.locale')
    .leftJoinAndSelect('resource.attributes', 'resource_attributes')
    .where('resource.key = :key AND resource_contents.locale = :locale')
    .setParameters({ key, locale })
    .getCount());
  if (isExistingResourceWithSameKeyAndSameLocale) {
    console.log(`Existing resource with this key and locale.
If new resource is wanted to create, please change key.
If another locale resource is wanted to create, please change locale.`);
    return;
  }

  const isExistingResourceWithSameKeyAndAnotherLocale = !!(await resourceRepository
    .createQueryBuilder('resource')
    .select('COUNT(`id`)')
    .leftJoinAndSelect('resource.contents', 'resource_contents')
    .leftJoinAndSelect('resource.meta', 'resource_meta', 'resource_meta.locale = resource_contents.locale')
    .leftJoinAndSelect('resource.attributes', 'resource_attributes')
    .where('resource.key = :key')
    .setParameters({ key })
    .getCount());
  if (isExistingResourceWithSameKeyAndAnotherLocale) {
    console.log(`Existing resource with this key and another locale.
New resource will be created with this locale.`);
  }

  // Create content
  let content: ResourceContent | null = null;
  if (params.contents) {
    content = new ResourceContent();
    content.locale = locale;
    content.name = params.contents.name || '';
    content.body = `/contents/${key}-${locale}.md`;
    await fsExtra.outputFile(`${contentsDir}${content.body}`, params.contents.body || '');
    await connection.manager.save(content);
  }

  let meta: ResourceMeta | null = null;
  if (locale && params.meta) {
    meta = new ResourceMeta();
    meta.locale = locale;
    meta.title = meta.title || '';
    meta.description = meta.description || '';
    meta.keywords = meta.keywords || '';
    await connection.manager.save(meta);
  }

  // Create resource
  let resource: Resource | null = null;
  if (isExistingResourceWithSameKeyAndAnotherLocale) {
    resource = await connection.getRepository(Resource).findOne({ where: { key }, relations: ['contents', 'meta'] });
    if (content) {
      resource.contents.push(content);
    }
    if (meta) {
      resource.meta.push(meta);
    }
    await connection.manager.save(resource);
  } else {
    resource = new Resource();
    resource.key = key;
    if (content) {
      resource.contents = [content];
    }
    if (meta) {
      resource.meta = [meta];
    }
    resource.type = resourceType;
    await connection.manager.save(resource);
  }

  // Create attributes
  // TODO: Update attributes for new resource with another locale
  const targetResourceType = resourceTypes.filter(resourceType => resourceType.name === resource.type)[0];
  if (targetResourceType && targetResourceType.attributes) {
    for (const attributeKey of Object.keys(targetResourceType.attributes)) {
      if (reservedResourceFields.indexOf(attributeKey) === -1) {
        const attributeType = targetResourceType.attributes[attributeKey].type;

        let defaultValue: any = '';
        if (attributeType === 'boolean') {
          defaultValue = false;
        } else if (attributeType === 'number') {
          defaultValue = 0;
        } else if (attributeType === 'string') {
          defaultValue = '';
        } else if (attributeType === 'date') {
          defaultValue = new Date();
        }
        defaultValue = targetResourceType.attributes[attributeKey].defaultValue || defaultValue;

        const resourceAttribute = new ResourceAttribute();
        resourceAttribute.key = attributeKey;
        resourceAttribute.value = params[attributeKey] || defaultValue;
        await connection.manager.save(resourceAttribute);
        if (resource.attributes) {
          resource.attributes.push(resourceAttribute);
        } else {
          resource.attributes = [resourceAttribute];
        }
      }
    }
    await connection.manager.save(resource);
  }

  return resource;
}

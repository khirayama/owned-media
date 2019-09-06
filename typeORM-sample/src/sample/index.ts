import * as typeorm from 'typeorm';

import { resourceTypes } from '../../config';
import { Resource } from '../entity/Resource';
import { createResource } from './usecases';

type ResourceResponse = {
  id: string;
  key: string;
  locale: string;
  type: string;
  contents: {
    name: string;
    body: string;
  };
  attributes: {
    [key: string]: any;
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  media: {
    [key: string]: {
      url: string;
      caption: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
};

function generateResourceResponse(resource: Resource): ResourceResponse {
  const content = resource.contents ? resource.contents[0] || null : null;
  const meta = resource.meta ? resource.meta[0] || null : null;

  const resourceResponse: ResourceResponse = {
    id: resource.id,
    locale: content ? content.locale : '',
    key: resource.key,
    type: resource.type,
    contents: {
      name: content ? content.name : '',
      body: content ? content.body : '',
    },
    meta: {
      title: meta ? meta.title : '',
      description: meta ? meta.description : '',
      keywords: meta ? meta.keywords : '',
    },
    attributes: {},
    media: {}, // TODO
    createdAt: resource.contents[0].createdAt,
    updatedAt: resource.contents[0].updatedAt,
  };

  const targetResourceType = resourceTypes.filter(resourceType => resourceType.name === resource.type)[0];
  if (targetResourceType && targetResourceType.attributes) {
    for (const attributeKey of Object.keys(targetResourceType.attributes)) {
      const attr = resource.attributes.filter(attr => attr.key === attributeKey)[0];
      switch (targetResourceType.attributes[attributeKey].type) {
        case 'boolean': {
          resourceResponse[attributeKey] = attr.value === 'true';
          break;
        }
        case 'number': {
          resourceResponse[attributeKey] = Number(attr.value);
          break;
        }
        case 'date': {
          resourceResponse[attributeKey] = new Date(attr.value);
          break;
        }
        default: {
          resourceResponse[attributeKey] = attr.value;
          break;
        }
      }
    }
  }

  return resourceResponse;
}

(async () => {
  const connection = await typeorm.createConnection();

  // not support type
  await createResource({
    locale: 'en_US',
    key: 'sample-resource-2',
    type: 'nota',
    name: 'サンプルネーム',
    body: 'サンプルボディ',
  });
  // not support locale
  await createResource({
    locale: 'en_UK',
    key: 'sample-resource-2',
    type: 'nota',
    name: 'サンプルネーム',
    body: 'サンプルボディ',
  });
  // Create new resource
  await createResource({
    locale: 'ja_JP',
    key: 'sample-resource',
    type: 'note',
    name: 'サンプルネーム',
    body: 'サンプルボディ',
  });
  // Create resource with another locale
  await createResource({
    locale: 'en_US',
    key: 'sample-resource',
    type: 'note',
    name: 'Sample Name',
    body: 'Sample Body',
  });
  // Create new resource
  await createResource({
    locale: 'en_US',
    key: 'sample-resource-2',
    type: 'note',
    name: 'サンプルネーム',
    body: 'サンプルボディ',
  });

  const resourceRepository = connection.getRepository(Resource);
  const resourceQuery = await resourceRepository
    .createQueryBuilder('resource')
    .leftJoinAndSelect('resource.contents', 'resource_contents')
    .leftJoinAndSelect('resource.meta', 'resource_meta', 'resource_meta.locale = resource_contents.locale')
    .leftJoinAndSelect('resource.attributes', 'resource_attributes')
    .where('resource_contents.locale = :locale');
  const resourcesWithContent = await resourceQuery.setParameters({ locale: 'ja_JP' }).getOne();
  console.log(generateResourceResponse(resourcesWithContent));
})();

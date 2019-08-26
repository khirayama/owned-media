import * as path from 'path';

import * as typeorm from "typeorm";

import { supportLocales, resourceTypes } from './config';
import { Resource } from './src/entity/Resource';
import { ResourceContent } from './src/entity/ResourceContent';
import { ResourceMeta } from './src/entity/ResourceMeta';
import { ResourceAttribute } from './src/entity/ResourceAttribute';

type ResourceResponse = {
  id: string;
  key: string;
  type: string;
  locale: string;
  name: string;
  body: string;
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
  attributes: {
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
};

function generateResourceResponse(resource: Resource): ResourceResponse {
  if (resource.contents.length !== 1) {
    console.log(`Please check your query.`);
  }

  const attributes = {};
  for (const attr of resource.attributes) {
    switch (attr.type) {
      case 'number': {
        attributes[attr.key] = Number(attr.value);
        break;
      }
    }
  }

  const meta = resource.meta[0] || null;

  return {
    id: resource.id,
    key: resource.key,
    type: resource.type,
    locale: resource.contents[0].locale,
    name: resource.contents[0].name,
    body: resource.contents[0].body,
    meta: {
      title: meta ? meta.title : '',
      description: meta ? meta.description : '',
      keywords: meta ? meta.keywords : '',
    },
    media: {}, // TODO
    attributes,
    createdAt: resource.contents[0].createdAt,
    updatedAt: resource.contents[0].updatedAt,
  };
}

async function createResource(locale: string, params: { key: string; type?: string; name?: string; body?: string; }) {
  const connection = typeorm.getConnection();

  const key = params.key;

  const content = new ResourceContent();
  content.locale = locale;
  content.name = params.name;
  content.body = '';
  await connection.manager.save(content);
  // TODO: Make markdown file with params.body
  content.body = `/contents/${key}-${locale}.md`;
  await connection.manager.save(content);

  const resource = new Resource();
  resource.key = key;
  resource.contents = [content];
  resource.type = params.type ? params.type : resourceTypes[0].name;
  await connection.manager.save(resource);
}

const root = path.resolve(__dirname);

(async () => {
  const connection = await typeorm.createConnection();

  const resourceRepository = connection.getRepository(Resource);
  const resourceQuery = await resourceRepository
    .createQueryBuilder('resource')
    .leftJoinAndSelect('resource.contents', 'resource_contents')
    .leftJoinAndSelect('resource.meta', 'resource_meta', 'resource_meta.locale = resource_contents.locale')
    .leftJoinAndSelect('resource.attributes', 'resource_attributes')
    .where('resource_contents.locale = :locale');
  const resourcesWithContent = await resourceQuery.setParameters({ locale: 'ja_JP' }).getOne();
  console.log(generateResourceResponse(resourcesWithContent));
  console.log(generateResourceResponse(await resourceQuery.setParameters({ locale: 'en_US' }).getOne()));
})();

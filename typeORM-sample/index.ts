import * as path from 'path';

import * as typeorm from "typeorm";

import { SupportLocale, ResourceType } from './config';
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

const root = path.resolve(__dirname);

(async () => {
  const connection = await typeorm.createConnection();

  // const key = 'fundation-knowledge';
  // const locale = SupportLocale.jaJP;
  //
  // const content = new ResourceContent();
  // content.locale = SupportLocale.jaJP;
  // content.name = '基礎知識';
  // content.body = '';
  // await connection.manager.save(content);
  // content.body = `/contents/${key}-${locale}.md`;
  // await connection.manager.save(content);
  //
  // const resource = new Resource();
  // resource.key = 'fundation-knowledge';
  // resource.contents = [content];
  // resource.type = ResourceType.NOTE;
  // await connection.manager.save(resource);

  const resourceRepository = connection.getRepository(Resource);
  // const resources = await resourceRepository.find();
  // const resourcesWithContents = await resourceRepository.find({ relations: ['contents'] });
  // console.log(resources);
  // console.log(resourcesWithContents);

  // const resourcesWithContent = await resourceRepository.find({
  //   where: {
  //     'locale': 'ja_JP',
  //   },
  //   join: {
  //     alias: 'r',
  //     leftJoinAndSelect: {
  //       rc: 'r.contents',
  //     },
  //   },
  // });
  const resourceQuery = await resourceRepository
    .createQueryBuilder('r')
    .leftJoinAndSelect('r.contents', 'resource_contents')
    .leftJoinAndSelect('r.meta', 'resource_meta', 'resource_meta.locale = resource_contents.locale')
    .leftJoinAndSelect('r.attributes', 'resource_attributes')
    .where('resource_contents.locale = :locale');
  const resourcesWithContent = await resourceQuery.setParameters({ locale: 'ja_JP' }).getOne();
  console.log(JSON.stringify(resourcesWithContent, null, 2));
  console.log(generateResourceResponse(resourcesWithContent));
  console.log(generateResourceResponse(await resourceQuery.setParameters({ locale: 'en_US' }).getOne()));
})();

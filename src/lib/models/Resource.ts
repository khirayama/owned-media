/* eslint-disable @typescript-eslint/camelcase */
import * as fs from 'fs';
import * as path from 'path';

import csvParse from 'csv-parse/lib/sync';
import csvStringify from 'csv-stringify/lib/sync';
import marked from 'marked';

import { config } from 'config';
import { ResourceShape, ResourceFullShape } from 'lib/types';

/*

- defaultLocale
- init
- find
  - conditions
  - options
    - locale
    - offset
    - limit

import { Resource } from 'lib/Resource';

Resource.init();
Resource.defaultLocale = 'ja';

Resource.find();
Resource.find(null, { locale: 'en' });
const relatedEnResources = Resource.find({
  id: Resource.relation(['1']),
}, {
  locale: 'en',
});
const relatedJaResources = Resource.find({
  id: Resource.relation(['4']),
});
const relatedEnResources = Resource.find({
  id: Resource.relation(['1']),
}, {
  limit: 10,
});
Resource.create({
  type: 'note',
  name: 'テスト',
  imageUrl: 'イメージパス',
  attributes: {
    sample: 'サンプル',
  },
  page: {
    title: 'テストタイトル',
    description: 'テスト説明文',
    imageUrl: 'イメージパス',
    keywords: 'キーワード,キーワード',
  },
}, {
  locale: 'ja',
});
Resource.update('1', {
  type: 'note',
  name: 'テスト',
  imageUrl: 'イメージパス',
  attributes: {
    sample: 'サンプル',
  },
  page: {
    title: 'テストタイトル',
    description: 'テスト説明文',
    imageUrl: 'イメージパス',
    keywords: 'キーワード,キーワード',
  },
}, {
  locale: 'en',
});
*/

const ROOT_PATH = path.join(__dirname, '..', '..', '..');
const DATA_PATH = path.join(ROOT_PATH, 'data');

type ResourceRow = {
  id: string;
  type: string;
  key: string;
  created_at: string;
  updated_at: string;
};

type ResourceContentRow = {
  id: string;
  resource_id: string;
  locale: string;
  name: string;
  image_url: string;
  body_path: string;
  created_at: string;
  updated_at: string;
};

type ResourceAttributeRow = {
  id: string;
  resource_id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
};

type PageRow = {
  id: string;
  resource_id: string;
  locale: string;
  title: string;
  description: string;
  image_url: string;
  keywords: string;
  created_at: string;
  updated_at: string;
};

type RelationRow = {
  id: string;
  resource1_id: string;
  resource2_id: string;
  created_at: string;
  updated_at: string;
};

type FindCondition = {
  id?: string[];
  type?: string[];
  key?: string[];
};

export class Resource {
  public static defaultLocale: string = config.locales[0];

  private static columns: {
    resources: string[];
    resourceContents: string[];
    resourceAttributes: string[];
    pages: string[];
    relations: string[];
  } = {
    resources: [],
    resourceContents: [],
    resourceAttributes: [],
    pages: [],
    relations: [],
  };

  private static rows: {
    resources: ResourceRow[];
    resourceContents: ResourceContentRow[];
    resourceAttributes: ResourceAttributeRow[];
    pages: PageRow[];
    relations: RelationRow[];
  } = {
    resources: [],
    resourceContents: [],
    resourceAttributes: [],
    pages: [],
    relations: [],
  };

  private static resources: ResourceFullShape[] = [];

  public static init() {
    this.load();
    this.resources = this.buildResource(
      this.rows.resources,
      this.rows.resourceContents,
      this.rows.resourceAttributes,
      this.rows.pages,
    );
  }

  private static load() {
    const options = {
      trim: true,
      columns: true,
      // cast: true,
    };

    const resourcesCSV = fs.readFileSync(path.join(DATA_PATH, 'resources.csv'), 'utf8');
    const resourceContentsCSV = fs.readFileSync(path.join(DATA_PATH, 'resource_contents.csv'), 'utf8');
    const resourceAttributesCSV = fs.readFileSync(path.join(DATA_PATH, 'resource_attributes.csv'), 'utf8');
    const pagesCSV = fs.readFileSync(path.join(DATA_PATH, 'pages.csv'), 'utf8');
    const relationsCSV = fs.readFileSync(path.join(DATA_PATH, 'relations.csv'), 'utf8');

    this.columns = {
      resources: resourcesCSV.split('\r')[0].split(','),
      resourceContents: resourceContentsCSV.split('\r')[0].split(','),
      resourceAttributes: resourceAttributesCSV.split('\r')[0].split(','),
      pages: pagesCSV.split('\r')[0].split(','),
      relations: relationsCSV.split('\r')[0].split(','),
    };
    this.rows = {
      resources: csvParse(resourcesCSV, options),
      resourceContents: csvParse(resourceContentsCSV, options),
      resourceAttributes: csvParse(resourceAttributesCSV, options),
      pages: csvParse(pagesCSV, options),
      relations: csvParse(relationsCSV, options),
    };
  }

  private static buildResource(
    resourceRows: ResourceRow[],
    resourceContentRows: ResourceContentRow[],
    resourceAttributeRows: ResourceAttributeRow[],
    pageRows: PageRow[],
  ): ResourceFullShape[] {
    const resources = [];

    for (const resourceRow of resourceRows) {
      const resource: ResourceFullShape = {
        id: resourceRow.id,
        type: resourceRow.type,
        key: resourceRow.key,
        name: {},
        imageUrl: {},
        bodyPath: {},
        body: {},
        page: {
          title: {},
          description: {},
          imageUrl: {},
          keywords: {},
        },
        attributes: {},
        createdAt: resourceRow.created_at,
        updatedAt: resourceRow.updated_at,
      };

      for (const resourceContentRow of resourceContentRows) {
        if (resourceContentRow.resource_id === resourceRow.id) {
          const locale: string = resourceContentRow.locale;
          const markdown = fs.readFileSync(
            path.join(DATA_PATH, '..', path.join(resourceContentRow['body_path'])),
            'utf8',
          );
          const html = marked(markdown);

          resource.name[locale] = resourceContentRow.name;
          resource.imageUrl[locale] = resourceContentRow.image_url;
          resource.bodyPath[locale] = resourceContentRow.body_path;
          resource.body[locale] = html;
        }
      }

      for (const pageRow of pageRows) {
        if (pageRow.resource_id === resourceRow.id) {
          const locale: string = pageRow.locale;

          resource.page.title[locale] = pageRow.title;
          resource.page.description[locale] = pageRow.description;
          resource.page.keywords[locale] = pageRow.keywords;
          resource.page.imageUrl[locale] = pageRow.image_url;
        }
      }

      for (const resourceAttributeRow of resourceAttributeRows) {
        if (resourceAttributeRow.resource_id === resourceRow.id) {
          for (let key of this.columns.resourceAttributes) {
            const whiteList = ['id', 'resource_id', 'created_at', 'updated_at'];

            if (whiteList.indexOf(key) === -1) {
              resource.attributes[resourceAttributeRow.key] = resourceAttributeRow.value;
            }
          }
        }
      }

      resources.push(resource);
    }

    return resources;
  }

  public static find(
    conditions?: FindCondition | null,
    options?: { locale?: string; limit?: number; offset?: number; sort?: string },
  ): ResourceShape[] | ResourceFullShape[] {
    let tmp = this.resources;

    if (conditions) {
      const targetKeys = ['id', 'type', 'key'];
      for (let targetKey of targetKeys) {
        if (conditions[targetKey]) {
          if (typeof conditions[targetKey] === 'string') {
            tmp = tmp.filter((t: ResourceFullShape) => t[targetKey] === conditions[targetKey]);
          } else if (Array.isArray(conditions[targetKey])) {
            tmp = tmp.filter((t: ResourceFullShape) => conditions[targetKey].indexOf(t[targetKey]) !== -1);
          }
        }
      }
    }

    // options
    const locale: string = options && options.locale ? options.locale || this.defaultLocale : this.defaultLocale;
    const limit: number | null = options && options.limit ? options.limit : null;
    const offset: number = options && options.offset ? options.offset : 0;
    // const sort: string = 'created_at' || '-created_at';

    if (limit) {
      tmp = tmp.slice(offset, limit);
    }

    return locale === 'all' ? tmp : tmp.map((t: ResourceFullShape) => this.build(t, locale));
  }

  public static relation(resourceIds: string[]): string[] {
    const relatedResourceIds: string[] = [];

    for (let relationRow of this.rows.relations) {
      if (resourceIds.indexOf(relationRow.resource1_id) !== -1) {
        relatedResourceIds.push(relationRow.resource2_id);
      } else if (resourceIds.indexOf(relationRow.resource2_id) !== -1) {
        relatedResourceIds.push(relationRow.resource1_id);
      }
    }

    return relatedResourceIds;
  }

  private static build(resource: ResourceFullShape, locale: string): ResourceShape {
    return {
      id: resource.id,
      type: resource.type,
      key: resource.key,
      name: resource.name[locale] || resource.name[this.defaultLocale],
      bodyPath: resource.bodyPath[locale] || resource.bodyPath[this.defaultLocale],
      body: resource.body[locale] || resource.body[this.defaultLocale],
      imageUrl: resource.imageUrl[locale] || resource.imageUrl[this.defaultLocale],
      page: {
        title: resource.page.title[locale] || resource.page.title[this.defaultLocale],
        description: resource.page.description[locale] || resource.page.description[this.defaultLocale],
        imageUrl: resource.page.imageUrl[locale] || resource.page.imageUrl[this.defaultLocale],
        keywords: resource.page.keywords[locale] || resource.page.keywords[this.defaultLocale],
      },
      attributes: resource.attributes,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    };
  }

  public static create(resource: ResourceShape, options: { locale: string } = { locale: this.defaultLocale }) {
    const locale = options.locale || this.defaultLocale;

    const now = new Date();
    const lastResourceRow = this.rows.resources[this.rows.resources.length - 1];
    const resourceId: string = lastResourceRow ? String(Number(lastResourceRow.id) + 1) : '1';

    // For resources
    const resourceType = resource.type;
    const resourceKey = resource.key;
    this.rows.resources.push({
      id: resourceId,
      type: resourceType,
      key: resourceKey,
      created_at: now.toString(),
      updated_at: now.toString(),
    });
    // For resource_contents
    const lastResourceContentRow = this.rows.resourceContents[this.rows.resourceContents.length - 1];
    const resourceContentId = lastResourceContentRow ? String(Number(lastResourceContentRow.id) + 1) : '0';
    const resourceName = resource.name;
    const resourceImageUrl = resource.imageUrl;

    const RESOURCE_CONTENTS_PATH = ['resources', resourceId, 'resource_contents'].join('/');
    const RESOURCE_CONTENTS_FULLPATH = [ROOT_PATH, 'resources', resourceId, 'resource_contents'].join('/');
    const fileName = `${resourceContentId}.md`;
    fs.mkdirSync(RESOURCE_CONTENTS_FULLPATH, { recursive: true });
    fs.closeSync(fs.openSync(path.join(RESOURCE_CONTENTS_FULLPATH, fileName), 'w'));
    const resourceBodyPath = '/' + path.join(RESOURCE_CONTENTS_PATH, fileName);
    this.rows.resourceContents.push({
      id: resourceContentId,
      resource_id: resourceId,
      locale,
      name: resourceName,
      image_url: resourceImageUrl,
      body_path: resourceBodyPath,
      created_at: now.toString(),
      updated_at: now.toString(),
    });
    // For resource_attributes
    for (let key of Object.keys(resource.attributes)) {
      const lastResourceAttributeRow = this.rows.resourceAttributes[this.rows.resourceAttributes.length - 1];
      const resourceAttributeId = lastResourceAttributeRow ? String(Number(lastResourceAttributeRow.id) + 1) : '0';
      this.rows.resourceAttributes.push({
        id: resourceAttributeId,
        resource_id: resourceId,
        key,
        value: resource.attributes[key],
        created_at: now.toString(),
        updated_at: now.toString(),
      });
    }
    // For page
    const lastPageRow = this.rows.pages[this.rows.pages.length - 1];
    const pageId = lastPageRow ? String(Number(lastPageRow.id) + 1) : '0';
    const pageTitle = resource.page.title;
    const pageDescription = resource.page.description;
    const pageImageUrl = resource.page.imageUrl;
    const pageKeywords = resource.page.keywords;
    this.rows.pages.push({
      id: pageId,
      resource_id: resourceId,
      locale,
      title: pageTitle,
      description: pageDescription,
      image_url: pageImageUrl,
      keywords: pageKeywords,
      created_at: now.toString(),
      updated_at: now.toString(),
    });

    this.save();

    this.resources = this.buildResource(
      this.rows.resources,
      this.rows.resourceContents,
      this.rows.resourceAttributes,
      this.rows.pages,
    );

    return this.find({ id: [resourceId] }, { locale })[0];
  }

  public static update(id: string, resource: Partial<ResourceShape>) {
    console.log(id, resource);
    // const locale = resource.locale || this.defaultLocale;
    //
    // const resourceRow = this.rows.resources.filter(resourceRow => resourceRow.id === id);
    // const resourceContentRow = this.rows.resourceContents.filter(
    //   resourceContentRow => resourceContentRow.resource_id === id && resourceContentRow.locale === locale,
    // );
    // const resourceAttributeRow = [];
    // const pageRow = this.rows.pages.filter(pageRow => pageRow.resource_id === id && pageRow.locale === locale);
    // console.log(resourceRow, resourceContentRow, resourceAttributeRow, pageRow);
  }

  public static save() {
    const resourcesString = csvStringify(this.rows.resources, {
      header: true,
      columns: this.columns.resources,
    });
    const resourceContentsString = csvStringify(this.rows.resourceContents, {
      header: true,
      columns: this.columns.resourceContents,
    });
    const resourceAttributesString = csvStringify(this.rows.resourceAttributes, {
      header: true,
      columns: this.columns.resourceAttributes,
    });
    const pagesString = csvStringify(this.rows.pages, {
      header: true,
      columns: this.columns.pages,
    });

    fs.writeFileSync(path.join(DATA_PATH, 'resources.csv'), resourcesString);
    fs.writeFileSync(path.join(DATA_PATH, 'resource_contents.csv'), resourceContentsString);
    fs.writeFileSync(path.join(DATA_PATH, 'resource_attributes.csv'), resourceAttributesString);
    fs.writeFileSync(path.join(DATA_PATH, 'pages.csv'), pagesString);
  }
}

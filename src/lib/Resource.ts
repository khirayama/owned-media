/* eslint-disable @typescript-eslint/camelcase */
import * as fs from 'fs';
import * as path from 'path';

import csvParse from 'csv-parse/lib/sync';
import csvStringify from 'csv-stringify/lib/sync';
import marked from 'marked';

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
  locale: 'ja',
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
});
*/

const ROOT_PATH = path.join(__dirname, '..', '..');
const DATA_PATH = path.join(ROOT_PATH, 'data');

type ResourceType = {
  id: string;
  type: string;
  key: string;
  name: {
    [key: string]: string;
  };
  image_url: {
    [key: string]: string;
  };
  body_path: {
    [key: string]: string;
  };
  body: {
    [key: string]: string;
  };
  page: {
    title: {
      [key: string]: string;
    };
    description: {
      [key: string]: string;
    };
    image_url: {
      [key: string]: string;
    };
    keywords: {
      [key: string]: string;
    };
  };
  attributes: any;
  created_at: string;
  updated_at: string;
};

export class Resource {
  public static defaultLocale: string = 'en';

  private static resourceRows: any[] = [];

  private static resourceContentRows: any[] = [];

  private static resourceAttributeRows: any[] = [];

  private static pageRows: any[] = [];

  private static relationRows: any[] = [];

  private static resources: ResourceType[] = [];

  public static init() {
    this.load();
    this.resources = this.buildResource(
      this.resourceRows,
      this.resourceContentRows,
      this.resourceAttributeRows,
      this.pageRows,
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

    this.resourceRows = csvParse(resourcesCSV, options);
    this.resourceContentRows = csvParse(resourceContentsCSV, options);
    this.resourceAttributeRows = csvParse(resourceAttributesCSV, options);
    this.pageRows = csvParse(pagesCSV, options);
    this.relationRows = csvParse(relationsCSV, options);
  }

  private static buildResource(
    resourceRows: any[],
    resourceContentRows: any[],
    resourceAttributeRows: any[],
    pageRows: any[],
  ): ResourceType[] {
    const resources = [];

    for (const resourceRow of resourceRows) {
      const resource = { ...resourceRow, attributes: {}, page: {} };

      for (const resourceContentRow of resourceContentRows) {
        if (resourceContentRow.resource_id === resourceRow.id) {
          for (let key of Object.keys(resourceContentRow)) {
            const whiteList = ['id', 'resource_id', 'locale', 'created_at', 'updated_at'];

            if (whiteList.indexOf(key) === -1) {
              if (resource[key]) {
                resource[key][resourceContentRow.locale] = resourceContentRow[key];
              } else {
                resource[key] = {
                  [resourceContentRow.locale]: resourceContentRow[key],
                };
              }
            }
            if (key === 'body_path') {
              const markdown = fs.readFileSync(path.join(DATA_PATH, '..', path.join(resourceContentRow[key])), 'utf8');
              const html = marked(markdown);

              if (resource.body) {
                resource.body[resourceContentRow.locale] = html;
              } else {
                resource.body = {
                  [resourceContentRow.locale]: html,
                };
              }
            }
          }
        }
      }

      for (const resourceAttributeRow of resourceAttributeRows) {
        if (resourceAttributeRow.resource_id === resourceRow.id) {
          for (let key of Object.keys(resourceAttributeRow)) {
            const whiteList = ['id', 'resource_id', 'created_at', 'updated_at'];

            if (whiteList.indexOf(key) === -1) {
              resource.attributes[resourceAttributeRow.key] = resourceAttributeRow.value;
            }
          }
        }
      }

      for (const pageRow of pageRows) {
        if (pageRow.resource_id === resourceRow.id) {
          for (let key of Object.keys(pageRow)) {
            const whiteList = ['id', 'resource_id', 'locale', 'created_at', 'updated_at'];

            if (whiteList.indexOf(key) === -1) {
              if (resource.page[key]) {
                resource.page[key][pageRow.locale] = pageRow[key];
              } else {
                resource.page[key] = {
                  [pageRow.locale]: pageRow[key],
                };
              }
            }
          }
        }
      }

      resources.push(resource);
    }

    return resources;
  }

  public static find(conditions?: any, options?: any) {
    let tmp = this.resources;

    if (conditions) {
      const targetKeys = ['id', 'type', 'key'];
      for (let targetKey of targetKeys) {
        if (conditions[targetKey]) {
          if (typeof conditions[targetKey] === 'string') {
            tmp = tmp.filter((t: ResourceType) => t[targetKey] === conditions[targetKey]);
          } else if (Array.isArray(conditions[targetKey])) {
            tmp = tmp.filter((t: ResourceType) => conditions[targetKey].indexOf(t[targetKey]) !== -1);
          }
        }
      }
    }

    // options
    const locale: string = options && options.locale ? options.locale || this.defaultLocale : this.defaultLocale;
    const limit: number | null = options && options.limit ? options.limit : null;
    const offset: number = options && options.offset ? options.offset : 0;
    const raw: boolean = options.raw || false;
    // created_at / -created_at
    // const sort: number = options && options.sort ? options.sort : 'created_at';

    if (limit) {
      tmp = tmp.slice(offset, limit);
    }

    return raw ? tmp : tmp.map((t: ResourceType) => this.build(t, locale));
  }

  public static relation(resourceIds: string[]): string[] {
    const relatedResourceIds: string[] = [];

    for (let relationRow of this.relationRows) {
      if (resourceIds.indexOf(relationRow.resource1_id) !== -1) {
        relatedResourceIds.push(relationRow.resource2_id);
      } else if (resourceIds.indexOf(relationRow.resource2_id) !== -1) {
        relatedResourceIds.push(relationRow.resource1_id);
      }
    }

    return relatedResourceIds;
  }

  private static build(resource: ResourceType, locale: string) {
    return {
      id: resource.id,
      type: resource.type,
      key: resource.key,
      name: resource.name[locale] || resource.name[this.defaultLocale],
      body_path: resource.body_path[locale] || resource.body_path[this.defaultLocale],
      body: resource.body[locale] || resource.body[this.defaultLocale],
      image_url: resource.image_url[locale] || resource.image_url[this.defaultLocale],
      page: {
        title: resource.page.title[locale] || resource.page.title[this.defaultLocale],
        description: resource.page.description[locale] || resource.page.description[this.defaultLocale],
        image_url: resource.page.image_url[locale] || resource.page.image_url[this.defaultLocale],
        keywords: resource.page.keywords[locale] || resource.page.keywords[this.defaultLocale],
      },
      attributes: resource.attributes,
      created_at: resource.created_at,
      updated_at: resource.updated_at,
    };
  }

  public static create(resource: any) {
    const now = new Date();
    const lastResourceRow = this.resourceRows[this.resourceRows.length - 1];
    const resourceId = lastResourceRow ? String(Number(lastResourceRow.id) + 1) : 0;

    // For resources
    const resourceType = resource.type;
    this.resourceRows.push({
      id: resourceId,
      type: resourceType,
      created_at: now.toString(),
      updated_at: now.toString(),
    });
    // For resource_contents
    const lastResourceContentRow = this.resourceContentRows[this.resourceContentRows.length - 1];
    const resourceContentId = lastResourceContentRow ? String(Number(lastResourceContentRow.id) + 1) : 0;
    const resourceLocale = resource.locale;
    const resourceName = resource.name;
    const resourceImageUrl = resource.imageUrl;

    const RESOURCE_CONTENTS_PATH = ['resources', resourceId, 'resource_contents'].join('/');
    const RESOURCE_CONTENTS_FULLPATH = [ROOT_PATH, 'resources', resourceId, 'resource_contents'].join('/');
    const fileName = `${resourceContentId}.md`;
    fs.mkdirSync(RESOURCE_CONTENTS_FULLPATH, { recursive: true });
    fs.closeSync(fs.openSync(path.join(RESOURCE_CONTENTS_FULLPATH, fileName), 'w'));
    const resourceBodyPath = '/' + path.join(RESOURCE_CONTENTS_PATH, fileName);
    this.resourceContentRows.push({
      id: resourceContentId,
      resource_id: resourceId,
      locale: resourceLocale,
      name: resourceName,
      image_url: resourceImageUrl,
      body_path: resourceBodyPath,
      created_at: now.toString(),
      updated_at: now.toString(),
    });
    // For resource_attributes
    for (let key of Object.keys(resource.attributes)) {
      const lastResourceAttributeRow = this.resourceAttributeRows[this.resourceAttributeRows.length - 1];
      const resourceAttributeId = lastResourceAttributeRow ? String(Number(lastResourceAttributeRow.id) + 1) : 0;
      this.resourceAttributeRows.push({
        id: resourceAttributeId,
        resource_id: resourceId,
        key,
        value: resource.attributes[key],
        created_at: now.toString(),
        updated_at: now.toString(),
      });
    }
    // For page
    const lastPageRow = this.pageRows[this.pageRows.length - 1];
    const pageId = lastPageRow ? String(Number(lastPageRow.id) + 1) : 0;
    const pageTitle = resource.page.title;
    const pageDescription = resource.page.description;
    const pageImageUrl = resource.page.image_url;
    const pageKeywords = resource.page.keywords;
    this.pageRows.push({
      id: pageId,
      resource_id: resourceId,
      locale: resourceLocale,
      title: pageTitle,
      description: pageDescription,
      image_url: pageImageUrl,
      keywords: pageKeywords,
      created_at: now.toString(),
      updated_at: now.toString(),
    });

    const resourcesString = csvStringify(this.resourceRows, {
      header: true,
      columns: Object.keys(this.resourceRows[0]),
    });
    const resourceContentsString = csvStringify(this.resourceContentRows, {
      header: true,
      columns: Object.keys(this.resourceContentRows[0]),
    });
    const resourceAttributesString = csvStringify(this.resourceAttributeRows, {
      header: true,
      columns: Object.keys(this.resourceAttributeRows[0]),
    });
    const pagesString = csvStringify(this.pageRows, { header: true, columns: Object.keys(this.pageRows[0]) });

    fs.writeFileSync(path.join(DATA_PATH, 'resources.csv'), resourcesString);
    fs.writeFileSync(path.join(DATA_PATH, 'resource_contents.csv'), resourceContentsString);
    fs.writeFileSync(path.join(DATA_PATH, 'resource_attributes.csv'), resourceAttributesString);
    fs.writeFileSync(path.join(DATA_PATH, 'pages.csv'), pagesString);

    this.resources = this.buildResource(
      this.resourceRows,
      this.resourceContentRows,
      this.resourceAttributeRows,
      this.pageRows,
    );
  }
}

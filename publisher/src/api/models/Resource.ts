/* eslint-disable @typescript-eslint/camelcase */
import * as path from 'path';

import * as fsExtra from 'fs-extra';

import { ResourceShape, ResourceWithAllLocalesShape } from '../types';
import { resourceWithAllLocalesToResource, loadConfig, csvStringify, csvParse } from '../utils';

const config = loadConfig();

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

const ROOT_PATH = process.cwd();
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

  private static columns = {
    resources: ['id', 'type', 'key', 'created_at', 'updated_at'],
    resourceContents: ['id', 'resource_id', 'locale', 'name', 'image_url', 'body_path', 'created_at', 'updated_at'],
    resourceAttributes: ['id', 'resource_id', 'key', 'value', 'created_at', 'updated_at'],
    pages: ['id', 'resource_id', 'locale', 'title', 'description', 'image_url', 'keywords', 'created_at', 'updated_at'],
    relations: ['id', 'resource1_id', 'resource2_id', 'created_at', 'updated_at'],
  };

  private static filePaths = {
    resources: path.join(DATA_PATH, 'resources.csv'),
    resourceContents: path.join(DATA_PATH, 'resource_contents.csv'),
    resourceAttributes: path.join(DATA_PATH, 'resource_attributes.csv'),
    pages: path.join(DATA_PATH, 'pages.csv'),
    relations: path.join(DATA_PATH, 'relations.csv'),
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

  private static resources: ResourceWithAllLocalesShape[] = [];

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
    try {
      const resourcesCSV = fsExtra.readFileSync(this.filePaths.resources, 'utf8');
      const resourceContentsCSV = fsExtra.readFileSync(this.filePaths.resourceContents, 'utf8');
      const resourceAttributesCSV = fsExtra.readFileSync(this.filePaths.resourceAttributes, 'utf8');
      const pagesCSV = fsExtra.readFileSync(this.filePaths.pages, 'utf8');
      const relationsCSV = fsExtra.readFileSync(this.filePaths.relations, 'utf8');

      this.rows = {
        resources: csvParse(resourcesCSV),
        resourceContents: csvParse(resourceContentsCSV),
        resourceAttributes: csvParse(resourceAttributesCSV),
        pages: csvParse(pagesCSV),
        relations: csvParse(relationsCSV),
      };
    } catch (e) {
      // noop
    }
  }

  private static buildResource(
    resourceRows: ResourceRow[],
    resourceContentRows: ResourceContentRow[],
    resourceAttributeRows: ResourceAttributeRow[],
    pageRows: PageRow[],
  ): ResourceWithAllLocalesShape[] {
    const resources: ResourceWithAllLocalesShape[] = [];

    for (const resourceRow of resourceRows) {
      const resource: ResourceWithAllLocalesShape = {
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
          let markdown = '';
          try {
            markdown = fsExtra.readFileSync(path.join(DATA_PATH, '..', path.join(resourceContentRow['body_path'])), 'utf8');
          } catch (e) {
            // noop
          }

          resource.name[locale] = resourceContentRow.name;
          resource.imageUrl[locale] = resourceContentRow.image_url;
          resource.bodyPath[locale] = resourceContentRow.body_path;
          resource.body[locale] = markdown;
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
  ): ResourceShape[] | ResourceWithAllLocalesShape[] {
    let tmp = this.resources;

    if (conditions) {
      const targetKeys = ['id', 'type', 'key'];
      for (let targetKey of targetKeys) {
        if (conditions[targetKey]) {
          if (typeof conditions[targetKey] === 'string') {
            tmp = tmp.filter((t: ResourceWithAllLocalesShape) => t[targetKey] === conditions[targetKey]);
          } else if (Array.isArray(conditions[targetKey])) {
            tmp = tmp.filter((t: ResourceWithAllLocalesShape) => conditions[targetKey].indexOf(t[targetKey]) !== -1);
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

    return locale === 'all' ? tmp : tmp.map((t: ResourceWithAllLocalesShape) => this.build(t, locale));
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

  private static build(resourceWithAllLocales: ResourceWithAllLocalesShape, locale: string): ResourceShape {
    return resourceWithAllLocalesToResource(resourceWithAllLocales, locale, { defaultLocale: this.defaultLocale });
  }

  public static create(resource: Partial<ResourceShape>, options: { locale: string } = { locale: this.defaultLocale }) {
    const locale = options.locale || this.defaultLocale;

    const now = new Date();
    const lastResourceRow = this.rows.resources[this.rows.resources.length - 1];
    const resourceId: string = lastResourceRow ? String(Number(lastResourceRow.id) + 1) : '1';

    // For resources
    const resourceType = resource.type || config.resourceTypes[0].type;
    const resourceKey = resource.key || '';
    this.rows.resources.push({
      id: resourceId,
      type: resourceType,
      key: resourceKey,
      created_at: now.toString(),
      updated_at: now.toString(),
    });
    // For resource_contents
    this.createContent(resourceId, resource, locale);
    // For pages
    if (resource.page) {
      this.createPage(resourceId, resource.page, locale);
    }
    // For resource_attributes
    if (resource.attributes) {
      for (let key of Object.keys(resource.attributes)) {
        const lastResourceAttributeRow = this.rows.resourceAttributes[this.rows.resourceAttributes.length - 1];
        const resourceAttributeId = lastResourceAttributeRow ? String(Number(lastResourceAttributeRow.id) + 1) : '1';
        this.rows.resourceAttributes.push({
          id: resourceAttributeId,
          resource_id: resourceId,
          key,
          value: resource.attributes[key],
          created_at: now.toString(),
          updated_at: now.toString(),
        });
      }
    }

    this.save();
    this.resources = this.buildResource(
      this.rows.resources,
      this.rows.resourceContents,
      this.rows.resourceAttributes,
      this.rows.pages,
    );

    return this.find({ id: [resourceId] }, { locale })[0];
  }

  public static update(
    resourceId: string,
    resource: Partial<ResourceShape>,
    options: { locale?: string } = { locale: this.defaultLocale },
  ) {
    const locale = options.locale || this.defaultLocale;
    const now = new Date();

    const resourceRow = this.rows.resources.filter(resourceRow => resourceRow.id === resourceId)[0];
    const resourceContentRow = this.rows.resourceContents.filter(
      resourceContentRow => resourceContentRow.resource_id === resourceId && resourceContentRow.locale === locale,
    )[0];
    const pageRow = this.rows.pages.filter(
      pageRow => pageRow.resource_id === resourceId && pageRow.locale === locale,
    )[0];
    const resourceAttributeRows = this.rows.resourceAttributes.filter(
      resourceAttributeRow => resourceAttributeRow.resource_id === resourceId,
    );

    // For resources
    if (resource.type !== undefined) {
      resourceRow.type = resource.type;
      resourceRow.updated_at = now.toString();
    }
    if (resource.key !== undefined) {
      resourceRow.key = resource.key;
      resourceRow.updated_at = now.toString();
    }
    // For resource_contents
    if (resourceContentRow !== undefined) {
      if (resource.name) {
        resourceContentRow.name = resource.name;
        resourceContentRow.updated_at = now.toString();
      }
      if (resource.bodyPath !== undefined) {
        resourceContentRow.body_path = resource.bodyPath;
        resourceContentRow.updated_at = now.toString();
      }
      if (resource.imageUrl !== undefined) {
        resourceContentRow.image_url = resource.imageUrl;
        resourceContentRow.updated_at = now.toString();
      }
    } else {
      this.createContent(resourceId, resource, locale);
    }
    // For pages
    if (resource.page) {
      if (pageRow) {
        if (resource.page.title !== undefined) {
          pageRow.title = resource.page.title;
          pageRow.updated_at = now.toString();
        }
        if (resource.page.description !== undefined) {
          pageRow.description = resource.page.description;
          pageRow.updated_at = now.toString();
        }
        if (resource.page.keywords !== undefined) {
          pageRow.keywords = resource.page.keywords;
          pageRow.updated_at = now.toString();
        }
        if (resource.page.imageUrl !== undefined) {
          pageRow.image_url = resource.page.imageUrl;
          pageRow.updated_at = now.toString();
        }
      } else {
        this.createPage(resourceId, resource.page, locale);
      }
    }
    // For resource_attributes
    if (resource.attributes) {
      for (let key of Object.keys(resource.attributes)) {
        let isExisting = false;
        for (let resourceAttributeRow of resourceAttributeRows) {
          if (resourceAttributeRow.key === key) {
            resourceAttributeRow.value = resource.attributes[key];
            resourceAttributeRow.updated_at = now.toString();
            isExisting = true;
          }
        }
        if (!isExisting) {
          const lastResourceAttributeRow = this.rows.resourceAttributes[this.rows.resourceAttributes.length - 1];
          const resourceAttributeId = lastResourceAttributeRow ? String(Number(lastResourceAttributeRow.id) + 1) : '1';
          this.rows.resourceAttributes.push({
            id: resourceAttributeId,
            resource_id: resourceId,
            key,
            value: resource.attributes[key],
            created_at: now.toString(),
            updated_at: now.toString(),
          });
        }
      }
    }

    this.save();
    this.resources = this.buildResource(
      this.rows.resources,
      this.rows.resourceContents,
      this.rows.resourceAttributes,
      this.rows.pages,
    );

    return this.find({ id: [resourceId] }, { locale })[0];
  }

  public static delete(resourceId: string): void {
    this.rows.resources = this.rows.resources.filter(row => row.id !== resourceId);
    this.rows.resourceContents = this.rows.resourceContents.filter(row => row.resource_id !== resourceId);
    this.rows.resourceAttributes = this.rows.resourceAttributes.filter(row => row.resource_id !== resourceId);
    this.rows.pages = this.rows.pages.filter(row => row.resource_id !== resourceId);
    this.rows.relations = this.rows.relations.filter(
      row => row.resource1_id !== resourceId && row.resource2_id !== resourceId,
    );

    this.save();
    this.resources = this.buildResource(
      this.rows.resources,
      this.rows.resourceContents,
      this.rows.resourceAttributes,
      this.rows.pages,
    );
  }

  private static createContent(resourceId: string, resource: Partial<ResourceShape>, locale: string) {
    const now = new Date();
    const lastResourceContentRow = this.rows.resourceContents[this.rows.resourceContents.length - 1];
    const resourceContentId = lastResourceContentRow ? String(Number(lastResourceContentRow.id) + 1) : '1';
    const resourceName = resource.name || '';
    const resourceImageUrl = resource.imageUrl || '';

    const RESOURCE_CONTENTS_PATH = ['resources', resourceId, 'resource_contents'].join('/');
    const RESOURCE_CONTENTS_FULLPATH = [ROOT_PATH, 'resources', resourceId, 'resource_contents'].join('/');
    const fileName = `${resourceContentId}.md`;

    fsExtra.mkdirSync(RESOURCE_CONTENTS_FULLPATH, { recursive: true });
    fsExtra.closeSync(fsExtra.openSync(path.join(RESOURCE_CONTENTS_FULLPATH, fileName), 'w'));

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
  }

  private static createPage(resourceId: string, page: Partial<ResourceShape['page']>, locale: string) {
    const now = new Date();
    const lastPageRow = this.rows.pages[this.rows.pages.length - 1];
    const pageId = lastPageRow ? String(Number(lastPageRow.id) + 1) : '1';
    const pageTitle = page.title || '';
    const pageDescription = page.description || '';
    const pageImageUrl = page.imageUrl || '';
    const pageKeywords = page.keywords || '';
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
  }

  public static createRelations(resourceId: string, relatedResourceIds: string[]) {
    const now = new Date();
    for (let i = 0; i < relatedResourceIds.length; i += 1) {
      const lastRelationRow = this.rows.relations[this.rows.relations.length - 1];
      const relationId = lastRelationRow ? String(Number(lastRelationRow.id) + 1) : '1';
      const relatedResourceId = relatedResourceIds[i];

      if (resourceId === relatedResourceId) {
        continue;
      }

      let isExisting = false;

      for (let j = 0; j < this.rows.relations.length; j += 1) {
        const row = this.rows.relations[j];
        if (
          (row.resource1_id === resourceId && row.resource2_id === relatedResourceId) ||
          (row.resource1_id === relatedResourceId && row.resource2_id === resourceId)
        ) {
          isExisting = true;
          row.updated_at = now.toString();
        }
      }

      if (!isExisting) {
        this.rows.relations.push({
          id: relationId,
          resource1_id: resourceId,
          resource2_id: relatedResourceId,
          created_at: now.toString(),
          updated_at: now.toString(),
        });
      }
    }

    this.save();
  }

  public static deleteRelations(resourceId: string, relatedResourceIds: string[]) {
    for (let i = 0; i < relatedResourceIds.length; i += 1) {
      const relatedResourceId = relatedResourceIds[i];

      if (resourceId === relatedResourceId) {
        continue;
      }

      for (let j = 0; j < this.rows.relations.length; j += 1) {
        const row = this.rows.relations[j];
        if (
          (row.resource1_id === resourceId && row.resource2_id === relatedResourceId) ||
          (row.resource1_id === relatedResourceId && row.resource2_id === resourceId)
        ) {
          this.rows.relations.splice(j, 1);
        }
      }
    }

    this.save();
  }

  public static save() {
    const resourcesString = csvStringify(this.rows.resources, this.columns.resources);
    const resourceContentsString = csvStringify(this.rows.resourceContents, this.columns.resourceContents);
    const resourceAttributesString = csvStringify(this.rows.resourceAttributes, this.columns.resourceAttributes);
    const pagesString = csvStringify(this.rows.pages, this.columns.pages);
    const relationsString = csvStringify(this.rows.relations, this.columns.relations);

    fsExtra.outputFile(this.filePaths.relations, resourcesString);
    fsExtra.outputFile(this.filePaths.resourceContents, resourceContentsString);
    fsExtra.outputFile(this.filePaths.resourceAttributes, resourceAttributesString);
    fsExtra.outputFile(this.filePaths.pages, pagesString);
    fsExtra.outputFile(this.filePaths.relations, relationsString);
  }
}

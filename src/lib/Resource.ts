/* eslint-disable @typescript-eslint/camelcase */
import * as fs from 'fs';
import * as path from 'path';
import csvParse from 'csv-parse/lib/sync';

/*

import { Resource } from 'lib/Resource';

Resource.init();
Resource.defaultLocale = 'ja';

Resource.find();

const relatedEnResources = Resource.find({
  locale: 'en',
  id: Resource.relation(['1']),
});

const relatedJaResources = Resource.find({
  id: Resource.relation(['4']),
});

*/

const ROOT_PATH = path.join(__dirname, '..', '..');
const DATA_PATH = path.join(ROOT_PATH, 'data');

type ResourceType = {
  id: string;
  type: string;
  name: {
    [key: string]: string;
  };
  image_url: {
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
};

export class Resource {
  public static defaultLocale: string = 'en';

  private static resourceRows: any[] = [];

  private static resourceContentRows: any[] = [];

  private static resourceAttributeRows: any[] = [];

  private static pageRows: any[] = [];

  private static relationRows: any[] = [];

  private static resources: ResourceType[] = [];

  // constructor() {
  // }

  public static init() {
    this.load();
    this.resources = this.buildResource(
      this.resourceRows,
      this.resourceContentRows,
      this.resourceAttributeRows,
      this.pageRows,
    );
    // console.log(this.resources);
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
            const whiteList = ['id', 'resource_id', 'locale', 'body_path'];

            if (whiteList.indexOf(key) === -1) {
              if (resource[key]) {
                resource[key][resourceContentRow.locale] = resourceContentRow[key];
              } else {
                resource[key] = {
                  [resourceContentRow.locale]: resourceContentRow[key],
                };
              }
            } else if (key === 'body_path') {
              // TODO: Read body path content
              if (resource.body) {
                resource.body[resourceContentRow.locale] = resourceContentRow[key];
              } else {
                resource.body = {
                  [resourceContentRow.locale]: resourceContentRow[key],
                };
              }
            }
          }
        }
      }

      for (const resourceAttributeRow of resourceAttributeRows) {
        if (resourceAttributeRow.resource_id === resourceRow.id) {
          for (let key of Object.keys(resourceAttributeRow)) {
            const whiteList = ['id', 'resource_id'];

            if (whiteList.indexOf(key) === -1) {
              resource.attributes[resourceAttributeRow.key] = resourceAttributeRow.value;
            }
          }
        }
      }

      for (const pageRow of pageRows) {
        if (pageRow.resource_id === resourceRow.id) {
          for (let key of Object.keys(pageRow)) {
            const whiteList = ['id', 'resource_id', 'locale'];

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

  public static find(conditions?: any) {
    const locale: string =
      conditions && conditions.locale ? conditions.locale || this.defaultLocale : this.defaultLocale;

    if (!conditions) {
      return this.resources.map((r: ResourceType) => this.build(r, locale));
    }

    let tmp = this.resources;

    // id, type
    const targetKeys = ['id', 'type'];
    for (let targetKey of targetKeys) {
      if (conditions[targetKey]) {
        if (typeof conditions[targetKey] === 'string') {
          tmp = tmp.filter((t: ResourceType) => t[targetKey] === conditions[targetKey]);
        } else if (Array.isArray(conditions[targetKey])) {
          tmp = tmp.filter((t: ResourceType) => conditions[targetKey].indexOf(t[targetKey]) !== -1);
        }
      }
    }

    return tmp.map((t: ResourceType) => this.build(t, locale));
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
      name: resource.name[locale] || resource.name[this.defaultLocale],
      body: resource.body[locale] || resource.body[this.defaultLocale],
      image_url: resource.image_url[locale] || resource.image_url[this.defaultLocale],
      page: {
        title: resource.page.title[locale] || resource.page.title[this.defaultLocale],
        description: resource.page.description[locale] || resource.page.description[this.defaultLocale],
        image_url: resource.page.image_url[locale] || resource.page.image_url[this.defaultLocale],
        keywords: resource.page.keywords[locale] || resource.page.keywords[this.defaultLocale],
      },
      attributes: resource.attributes,
    };
  }
}

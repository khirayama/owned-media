/* eslint-disable @typescript-eslint/camelcase */
import * as path from 'path';

import npmCsvParse from 'csv-parse/lib/sync';
import npmCdvStringify from 'csv-stringify/lib/sync';

import {
  ResourceWithAllLocalesShape,
  ResourceWithAllLocalesShapeWithRelations,
  ResourceShape,
  ResourceRequest,
  ResourceWithAllLocalesResponse,
  ResourceResponse,
  Config,
} from '../types';

declare var window: any;

export function loadConfig(): Config {
  let conf;

  if (typeof window === 'object') {
    conf = window.config as Config;
  } else {
    const CONFIG_PATH = path.join(process.cwd(), 'config');
    conf = require(CONFIG_PATH) as Config;
  }

  return conf;
}
const config = loadConfig();

export function createLocaleObj(locales: string[]) {
  const obj = {};
  for (let locale of locales) {
    obj[locale] = '';
  }
  return obj;
}

export function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function mergeDeep(target: any, ...sources: any): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

// CSV
export function extractColumns(csv: string) {
  return csv
    .split('\n')[0]
    .split(',')
    .map(s => s.replace('\r', '').trim());
}

export function csvStringify(data: any[], columns: string[]) {
  const csvString = npmCdvStringify(data, {
    header: true,
    columns: columns,
  });

  return csvString;
}

export function csvParse(csvString: string): any {
  const records = npmCsvParse(csvString, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
}

// Strings
export function snakeToCamel(t: string) {
  return t.replace(/_./g, (s: string) => s.charAt(1).toUpperCase());
}

export function camelToSnake(t: string) {
  return t.replace(/([A-Z])/g, (s: string) => '_' + s.charAt(0).toLowerCase());
}

// Transformer
export function resourceToRequest(resource: ResourceShape): ResourceRequest {
  return {
    type: resource.type,
    key: resource.key,
    name: resource.name,
    image_url: resource.imageUrl,
    page: {
      title: resource.page.title,
      description: resource.page.description,
      image_url: resource.page.imageUrl,
      keywords: resource.page.keywords,
    },
    attributes: resource.attributes,
  };
}

export function resourceWithAllLocalesToRequest(
  resourceWithAllLocales: ResourceWithAllLocalesShape,
  locale: string,
): ResourceRequest {
  return {
    type: resourceWithAllLocales.type,
    key: resourceWithAllLocales.key,
    name: resourceWithAllLocales.name[locale],
    image_url: resourceWithAllLocales.imageUrl[locale],
    page: {
      title: resourceWithAllLocales.page.title[locale],
      description: resourceWithAllLocales.page.description[locale],
      image_url: resourceWithAllLocales.page.imageUrl[locale],
      keywords: resourceWithAllLocales.page.keywords[locale],
    },
    attributes: resourceWithAllLocales.attributes,
  };
}

export function responseToResource(resourceResponse: ResourceResponse): ResourceShape {
  return {
    id: resourceResponse.id,
    type: resourceResponse.type,
    key: resourceResponse.key,
    name: resourceResponse.name,
    imageUrl: resourceResponse.image_url,
    bodyPath: resourceResponse.body_path,
    body: resourceResponse.body,
    page: {
      title: resourceResponse.page.title,
      description: resourceResponse.page.description,
      keywords: resourceResponse.page.keywords,
      imageUrl: resourceResponse.page.image_url,
    },
    attributes: resourceResponse.attributes,
    createdAt: resourceResponse.created_at,
    updatedAt: resourceResponse.updated_at,
  };
}

export function responseWithAllLocalesToResourceWithAllLocales(
  resourceWithAllLocalesResponse: ResourceWithAllLocalesResponse,
): ResourceWithAllLocalesShape {
  return {
    id: resourceWithAllLocalesResponse.id,
    type: resourceWithAllLocalesResponse.type,
    key: resourceWithAllLocalesResponse.key,
    name: resourceWithAllLocalesResponse.name,
    imageUrl: resourceWithAllLocalesResponse.image_url,
    bodyPath: resourceWithAllLocalesResponse.body_path,
    body: resourceWithAllLocalesResponse.body,
    page: {
      title: resourceWithAllLocalesResponse.page.title,
      description: resourceWithAllLocalesResponse.page.description,
      keywords: resourceWithAllLocalesResponse.page.keywords,
      imageUrl: resourceWithAllLocalesResponse.page.image_url,
    },
    attributes: resourceWithAllLocalesResponse.attributes,
    createdAt: resourceWithAllLocalesResponse.created_at,
    updatedAt: resourceWithAllLocalesResponse.updated_at,
  };
}

export function requestToPartialResource(req: ResourceRequest): Partial<ResourceShape> {
  return {
    // id: '',
    type: req.type,
    name: req.name,
    key: req.key,
    imageUrl: req.image_url,
    bodyPath: req.body_path,
    // body: '',
    page: {
      title: req.page.title,
      description: req.page.description,
      keywords: req.page.keywords,
      imageUrl: req.page.image_url,
    },
    attributes: req.attributes,
    // createdAt: '',
    // updatedAt: '',
  };
}

export function resourceWithAllLocalesToResource(
  resourceWithAllLocales: ResourceWithAllLocalesShape,
  locale: string,
  options?: { defaultLocale: string },
) {
  const defaultLocale = options ? options.defaultLocale || config.locales[0] : config.locales[0];

  return {
    id: resourceWithAllLocales.id,
    type: resourceWithAllLocales.type,
    key: resourceWithAllLocales.key,
    name: resourceWithAllLocales.name[locale] || resourceWithAllLocales.name[defaultLocale],
    bodyPath: resourceWithAllLocales.bodyPath[locale] || resourceWithAllLocales.bodyPath[defaultLocale],
    body: resourceWithAllLocales.body[locale] || resourceWithAllLocales.body[defaultLocale],
    imageUrl: resourceWithAllLocales.imageUrl[locale] || resourceWithAllLocales.imageUrl[defaultLocale],
    page: {
      title: resourceWithAllLocales.page.title[locale] || resourceWithAllLocales.page.title[defaultLocale],
      description:
        resourceWithAllLocales.page.description[locale] || resourceWithAllLocales.page.description[defaultLocale],
      imageUrl: resourceWithAllLocales.page.imageUrl[locale] || resourceWithAllLocales.page.imageUrl[defaultLocale],
      keywords: resourceWithAllLocales.page.keywords[locale] || resourceWithAllLocales.page.keywords[defaultLocale],
    },
    attributes: resourceWithAllLocales.attributes,
    createdAt: resourceWithAllLocales.createdAt,
    updatedAt: resourceWithAllLocales.updatedAt,
  };
}

export function resourceToPartialResourceWithAllLocales(
  resource: ResourceShape,
  locale: string,
): ResourceWithAllLocalesShape {
  return {
    id: resource.id,
    type: resource.type,
    key: resource.key,
    name: {
      [locale]: resource.name,
    },
    body: {
      [locale]: resource.body,
    },
    bodyPath: {
      [locale]: resource.bodyPath,
    },
    imageUrl: {
      [locale]: resource.imageUrl,
    },
    page: {
      title: {
        [locale]: resource.page.title,
      },
      description: {
        [locale]: resource.page.description,
      },
      imageUrl: {
        [locale]: resource.page.imageUrl,
      },
      keywords: {
        [locale]: resource.page.keywords,
      },
    },
    attributes: resource.attributes,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
}

export function createDefaultResource(): ResourceWithAllLocalesShapeWithRelations {
  const now = new Date();

  return {
    id: '',
    type: config.resourceTypes[0].type,
    key: '',
    body: createLocaleObj(config.locales),
    bodyPath: createLocaleObj(config.locales),
    imageUrl: createLocaleObj(config.locales),
    name: createLocaleObj(config.locales),
    page: {
      title: createLocaleObj(config.locales),
      description: createLocaleObj(config.locales),
      imageUrl: createLocaleObj(config.locales),
      keywords: createLocaleObj(config.locales),
    },
    attributes: {},
    relations: [],
    createdAt: now.toString(),
    updatedAt: now.toString(),
  };
}

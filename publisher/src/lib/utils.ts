/* eslint-disable @typescript-eslint/camelcase */
import * as path from 'path';

import { ResourceFullShape, ResourceShape, ResourceRequest, ResourceFullResponse, ResourceResponse } from '../lib/types';

const CONFIG_PATH = path.join(process.cwd(), 'config');
const { config } = require(CONFIG_PATH);

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
  let csv: any[] = [];
  csv.push(columns.join(','));

  for (let d of data) {
    const row: any[] = [];
    for (let column of columns) {
      row.push(d[column]);
    }

    csv.push(row.join(','));
  }

  return csv.filter(row => !!row).join('\n');
}

export function csvParse(csvString: string): any {
  const values: any[] = [];
  const rows = csvString.split('\n').filter(s => !!s);
  const columns = rows[0].split(',');

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i].split(',');
    const value = {};

    for (let j = 0; j < columns.length; j += 1) {
      value[columns[j]] = row[j];
    }

    values.push(value);
  }
  return values;
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

export function resourceFullToRequest(resourceFull: ResourceFullShape, locale: string): ResourceRequest {
  return {
    type: resourceFull.type,
    key: resourceFull.key,
    name: resourceFull.name[locale],
    image_url: resourceFull.imageUrl[locale],
    page: {
      title: resourceFull.page.title[locale],
      description: resourceFull.page.description[locale],
      image_url: resourceFull.page.imageUrl[locale],
      keywords: resourceFull.page.keywords[locale],
    },
    attributes: resourceFull.attributes,
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

export function responseFullToResourceFull(resourceFullResponse: ResourceFullResponse): ResourceFullShape {
  return {
    id: resourceFullResponse.id,
    type: resourceFullResponse.type,
    key: resourceFullResponse.key,
    name: resourceFullResponse.name,
    imageUrl: resourceFullResponse.image_url,
    bodyPath: resourceFullResponse.body_path,
    body: resourceFullResponse.body,
    page: {
      title: resourceFullResponse.page.title,
      description: resourceFullResponse.page.description,
      keywords: resourceFullResponse.page.keywords,
      imageUrl: resourceFullResponse.page.image_url,
    },
    attributes: resourceFullResponse.attributes,
    createdAt: resourceFullResponse.created_at,
    updatedAt: resourceFullResponse.updated_at,
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

export function resourceFullToResource(
  resourceFull: ResourceFullShape,
  locale: string,
  options?: { defaultLocale: string },
) {
  const defaultLocale = options ? options.defaultLocale || config.locales[0] : config.locales[0];

  return {
    id: resourceFull.id,
    type: resourceFull.type,
    key: resourceFull.key,
    name: resourceFull.name[locale] || resourceFull.name[defaultLocale],
    bodyPath: resourceFull.bodyPath[locale] || resourceFull.bodyPath[defaultLocale],
    body: resourceFull.body[locale] || resourceFull.body[defaultLocale],
    imageUrl: resourceFull.imageUrl[locale] || resourceFull.imageUrl[defaultLocale],
    page: {
      title: resourceFull.page.title[locale] || resourceFull.page.title[defaultLocale],
      description: resourceFull.page.description[locale] || resourceFull.page.description[defaultLocale],
      imageUrl: resourceFull.page.imageUrl[locale] || resourceFull.page.imageUrl[defaultLocale],
      keywords: resourceFull.page.keywords[locale] || resourceFull.page.keywords[defaultLocale],
    },
    attributes: resourceFull.attributes,
    createdAt: resourceFull.createdAt,
    updatedAt: resourceFull.updatedAt,
  };
}

export function resourceToPartialResourceFull(resource: ResourceShape, locale: string) {
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

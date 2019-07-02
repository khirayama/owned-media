/* eslint-disable @typescript-eslint/camelcase */
import { ResourceFullShape, ResourceShape, ResourceRequest, ResourceFullResponse, ResourceResponse } from 'lib/types';

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

export function snakeToCamel(t: string) {
  return t.replace(/_./g, (s: string) => s.charAt(1).toUpperCase());
}

export function camelToSnake(t: string) {
  return t.replace(/([A-Z])/g, (s: string) => '_' + s.charAt(0).toLowerCase());
}

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

export function requestToResource(req: ResourceRequest): ResourceShape {
  return {
    id: '',
    type: req.type,
    name: req.name,
    key: req.key,
    imageUrl: req.image_url,
    bodyPath: req.body_path || '',
    body: '',
    page: {
      title: req.page.title,
      description: req.page.description,
      keywords: req.page.keywords,
      imageUrl: req.page.image_url,
    },
    attributes: req.attributes,
    createdAt: '',
    updatedAt: '',
  };
}

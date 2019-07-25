/* eslint-disable @typescript-eslint/camelcase */
import {
  ResourceWithAllLocalesShape,
  ResourceShape,
  ResourceRequest,
  ResourceResponse,
} from '../../types';

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
  const defaultLocale = options ? options.defaultLocale : '';

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

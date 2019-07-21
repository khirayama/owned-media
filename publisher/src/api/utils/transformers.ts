import { ResourceWithAllLocalesShape, ResourceRequest, ResourceShape } from '../../types';

import { loadConfig } from './loadConfig';

const config = loadConfig();

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

import { ResourceWithAllLocalesShape, ResourceRequest, ResourceShape } from '../types';

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
    media: resourceWithAllLocales.media,
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
    bodyPath: req.body_path,
    // body: '',
    media: req.media,
    attributes: req.attributes,
    // createdAt: '',
    // updatedAt: '',
  };
}

import { ResourceWithAllLocalesShapeWithRelations } from '../../types';

function createLocaleObj(locales: string[]) {
  const obj = {};
  for (let locale of locales) {
    obj[locale] = '';
  }
  return obj;
}

export function createDefaultResource(
  defaultResourceType: string,
  locales: string[],
): ResourceWithAllLocalesShapeWithRelations {
  const now = new Date();

  return {
    id: '',
    type: defaultResourceType,
    key: '',
    body: createLocaleObj(locales),
    bodyPath: createLocaleObj(locales),
    imageUrl: createLocaleObj(locales),
    name: createLocaleObj(locales),
    page: {
      title: createLocaleObj(locales),
      description: createLocaleObj(locales),
      imageUrl: createLocaleObj(locales),
      keywords: createLocaleObj(locales),
    },
    attributes: {},
    relations: [],
    createdAt: now.toString(),
    updatedAt: now.toString(),
  };
}

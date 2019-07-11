export type LocaleObject = {
  [key: string]: string;
};

export type Config = {
  locales: string[];
  name: LocaleObject;
  tagline: LocaleObject;
  description: LocaleObject;
  resourceTypes: {
    name: string;
    type: string;
    attributes?: {
      key: string;
      inputType: string;
      options?: {
        name: string;
        value: string | number;
      }[];
    }[];
  }[];
};

export type ResourceRequest = {
  type: string;
  name: string;
  key: string;
  image_url: string;
  body_path?: string;
  page: {
    title: string;
    description: string;
    image_url: string;
    keywords: string;
  };
  attributes: {
    [key: string]: string;
  };
};

export type ResourceResponse = {
  id: string;
  type: string;
  key: string;
  name: string;
  image_url: string;
  body_path: string;
  body: string;
  page: {
    title: string;
    description: string;
    image_url: string;
    keywords: string;
  };
  attributes: {
    [key: string]: string;
  };
  created_at: string;
  updated_at: string;
};

export type ResourceWithAllLocalesResponse = {
  id: string;
  type: string;
  key: string;
  name: LocaleObject;
  body: LocaleObject;
  body_path: LocaleObject;
  image_url: LocaleObject;
  page: {
    title: LocaleObject;
    description: LocaleObject;
    image_url: LocaleObject;
    keywords: LocaleObject;
  };
  attributes: {
    [key: string]: string;
  };
  created_at: string;
  updated_at: string;
};

export type ResourceShape = {
  id: string;
  type: string;
  key: string;
  name: string;
  imageUrl: string;
  bodyPath: string;
  body: string;
  page: {
    title: string;
    description: string;
    imageUrl: string;
    keywords: string;
  };
  attributes: {
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ResourceWithAllLocalesShape = {
  id: string;
  type: string;
  key: string;
  name: LocaleObject;
  imageUrl: LocaleObject;
  bodyPath: LocaleObject;
  body: LocaleObject;
  page: {
    title: LocaleObject;
    description: LocaleObject;
    imageUrl: LocaleObject;
    keywords: LocaleObject;
  };
  attributes: {
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ResourceShapeWithRelations = ResourceShape & {
  relations: string[];
};

export type ResourceWithAllLocalesShapeWithRelations = ResourceWithAllLocalesShape & {
  relations: string[];
};

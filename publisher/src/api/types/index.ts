export type LocaleObject = {
  [key: string]: string;
};

export type ResourceType = {
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
};

export type Config = {
  locales: string[];
  name: LocaleObject;
  tagline: LocaleObject;
  description: LocaleObject;
  resourceTypes: ResourceType[];
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

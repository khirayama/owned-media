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
  bodyPath: LocaleObject;
  body: LocaleObject;
  media: {
    [key: string]: string;
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
  bodyPath: string;
  body: string;
  media: {
    [key: string]: string;
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
  body_path?: string;
  media: {
    [key: string]: string;
  };
  attributes: {
    [key: string]: string;
  };
};

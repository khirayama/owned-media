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

export type ResourceShape = {
  id: string;
  type: string;
  key: string;
  contents: {
    [key: string]: string;
  };
  attributes: {
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ResourceUpdateShape = {
  id: string;
  type: string;
  key: string;
  contents: {
    [key: string]: string | null;
  };
  attributes: {
    [key: string]: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type ResourceRequest = {
  type: string;
  name: string;
  key: string;
  contents: {
    [key: string]: string;
  };
  attributes: {
    [key: string]: string;
  };
};

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

export type ResourceFullResponse = {
  id: string;
  type: string;
  key: string;
  name: {
    [key: string]: string;
  };
  body: {
    [key: string]: string;
  };
  body_path: {
    [key: string]: string;
  };
  image_url: {
    [key: string]: string;
  };
  page: {
    title: {
      [key: string]: string;
    };
    description: {
      [key: string]: string;
    };
    image_url: {
      [key: string]: string;
    };
    keywords: {
      [key: string]: string;
    };
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

export type ResourceFullShape = {
  id: string;
  type: string;
  key: string;
  name: {
    [key: string]: string;
  };
  imageUrl: {
    [key: string]: string;
  };
  bodyPath: {
    [key: string]: string;
  };
  body: {
    [key: string]: string;
  };
  page: {
    title: {
      [key: string]: string;
    };
    description: {
      [key: string]: string;
    };
    imageUrl: {
      [key: string]: string;
    };
    keywords: {
      [key: string]: string;
    };
  };
  attributes: {
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
};

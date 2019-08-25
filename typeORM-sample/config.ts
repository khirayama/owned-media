export const supportLocales: string[] = [
  'ja_JP',
  'en_US',
];

export const resourceTypes: {
  name: string;
  attributes?: {
    [key: string]: {
      type: 'boolean' | 'number' | 'string' | 'date';
      defaultValue?: boolean | number | string | Date;
    };
  };
}[] = [
  {
    name: 'note',
  },
  {
    name: 'product',
  },
  {
    name: 'plant',
    attributes: {
      shadeTolerance: {
        type: 'number',
        defaultValue: 1,
      },
      coldTolerance: {
        type: 'number',
        defaultValue: 1,
      },
    },
  },
];

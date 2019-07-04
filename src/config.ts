const name = {
  ja: 'GREEN HANDBOOK',
  en: 'GREEN HANDBOOK',
};

export const config = {
  locales: ['ja', 'en'],
  name,
  tagline: {
    ja: `${name.ja} - インドアグリーン、観葉植物の育て方や知識を入門から楽しむまで`,
    en: `${name.en} - The Media of indoor green and plants to know how to grow and knowledge`,
  },
  description: {
    ja: `インドアグリーン、観葉植物の育て方や知識を入門から楽しむまで`,
    en: `The Media of indoor green and plants to know how to grow and knowledge`,
  },
  path: {
    api: '/api',
    adminApi: '/admin/api',
  },
};

export const resourceTypes = [
  {
    name: 'notes',
    type: 'note',
  },
  {
    name: 'labels',
    type: 'label',
  },
  {
    name: 'plants',
    type: 'plant',
    attributes: [
      {
        key: 'shadeTolerance',
        inputType: 'select',
        options: [
          {
            name: 'Very Weak',
            value: 0,
          },
          {
            name: 'Weak',
            value: 1,
          },
          {
            name: 'Standard',
            value: 2,
          },
          {
            name: 'Strong',
            value: 3,
          },
          {
            name: 'Very Strong',
            value: 4,
          },
        ],
      },
      {
        key: 'coldTolerance',
        inputType: 'select',
        options: [
          {
            name: 'Very Weak',
            value: 0,
          },
          {
            name: 'Weak',
            value: 1,
          },
          {
            name: 'Standard',
            value: 2,
          },
          {
            name: 'Strong',
            value: 3,
          },
          {
            name: 'Very Strong',
            value: 4,
          },
        ],
      },
    ],
  },
  {
    name: 'products',
    type: 'product',
    attributes: [
      {
        key: 'suggestedRetailPrice',
        inputType: 'number',
      },
      {
        key: 'releaseDate',
        inputType: 'date',
      },
    ],
  },
];

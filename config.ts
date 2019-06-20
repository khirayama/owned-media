const name = {
  ja: 'INDOOR GREEN',
  en: 'INDOOR GREEN',
};

export const config = {
  locales: ['ja', 'en'],
  name,
  tagline: {
    ja: `${name.ja} - インドアグリーン、観葉植物の育て方や知識を深めるメディア`,
    en: `${name.en} - The Media of indoor green and plants to know how to grow and knowledge`,
  },
  description: {
    ja: `インドアグリーン、観葉植物の育て方や知識を深めるメディア`,
    en: `The Media of indoor green and plants to know how to grow and knowledge`,
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
        key: 'shade_tolerance',
        inputType: 'select',
        options: [
          {
            name: {
              ja: '弱',
              en: 'Weak',
            },
            value: 0,
          },
          {
            name: {
              ja: '中',
              en: 'Standard',
            },
            value: 1,
          },
          {
            name: {
              ja: '強',
              en: 'Strong',
            },
            value: 2,
          },
        ],
      },
      {
        key: 'cold_tolerance',
        inputType: 'select',
        options: [
          {
            name: {
              ja: '弱',
              en: 'Weak',
            },
            value: 0,
          },
          {
            name: {
              ja: '中',
              en: 'Standard',
            },
            value: 1,
          },
          {
            name: {
              ja: '強',
              en: 'Strong',
            },
            value: 2,
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
        key: 'suggested_retail_price',
        inputType: 'number',
      },
      {
        key: 'release_date',
        inputType: 'date',
      },
    ],
  },
];

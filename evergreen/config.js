const name = {
  ja: 'EVERGREEN',
  en: 'EVERGREEN',
};

const SEOAttributes = [
  {
    key: 'title',
    inputType: 'text',
  },
  {
    key: 'description',
    inputType: 'text',
  },
  {
    key: 'keywords',
    inputType: 'text',
  },
];

const resourceTypes = [
  {
    name: 'notes',
    type: 'note',
    attributes: SEOAttributes,
  },
  {
    name: 'labels',
    type: 'label',
    attributes: SEOAttributes,
  },
  {
    name: 'plants',
    type: 'plant',
    attributes: [
      ...SEOAttributes,
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
      ...SEOAttributes,
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

const config = {
  locales: ['ja', 'en'],
  name,
  tagline: {
    ja: `${name.ja} - インドアグリーン、観葉植物の育て方や知識を入門から楽しむまで`,
    en: `${name.en} - Knowledge for beginner to senior of indeer plants`,
  },
  description: {
    ja: `インドアグリーン、観葉植物の育て方や知識を入門から楽しむまで`,
    en: `Knowledge for beginner to senior of indeer plants`,
  },
  resourceTypes,
};

module.exports = config;

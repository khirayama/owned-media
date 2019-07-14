const name = {
  ja: '緑色手帖',
};

const resourceTypes = [
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

const config = {
  locales: ['ja'],
  name,
  tagline: {
    ja: `${name.ja} - インドアグリーン、観葉植物の育て方や知識を入門から楽しむまで`,
  },
  description: {
    ja: `インドアグリーン、観葉植物の育て方や知識を入門から楽しむまで`,
  },
  resourceTypes,
};

module.exports = config;

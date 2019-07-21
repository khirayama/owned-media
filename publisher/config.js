const name = {
  ja: 'サンプルネーム',
  en: 'Sample Name',
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
];

const config = {
  locales: ['ja', 'en'],
  name,
  tagline: {
    ja: 'サンプルタグライン',
    en: 'Sample Tagline',
  },
  description: {
    ja: 'サンプル説明文',
    en: 'Sample Description',
  },
  resourceTypes,
};

module.exports = config;

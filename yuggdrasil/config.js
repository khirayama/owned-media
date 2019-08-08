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

const locales = {
  jaJP: 'ja_JP',
  enUS: 'en_US',
};

const config = {
  locales: [locales.jaJP, locales.enUS],
  name: {
    [locales.jaJP]: 'サンプルネーム',
    [locales.enUS]: 'Sample Name',
  },
  tagline: {
    [locales.jaJP]: 'サンプルタグライン',
    [locales.enUS]: 'Sample Tagline',
  },
  description: {
    [locales.jaJP]: 'サンプル説明文',
    [locales.enUS]: 'Sample Description',
  },
  resourceTypes,
};

module.exports = config;

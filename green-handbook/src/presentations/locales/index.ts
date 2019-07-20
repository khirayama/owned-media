import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import jaLocaleData from 'react-intl/locale-data/ja';

addLocaleData(enLocaleData);
addLocaleData(jaLocaleData);

const publisherConfig = require('../../../config');

const dic = {
  Home: {
    Title: {
      ja: 'やぁ、ホーム！',
      en: 'Hi, Home!',
    },
    Description: {
      ja: 'ここはホームページです。',
      en: 'This is Home page!',
    },
  },
  Resource: {
    Title: {
      ja: `ja {title} | ${publisherConfig.name.ja}`,
      en: `en {title} | ${publisherConfig.name.en}`,
    },
    Description: {
      ja: `ja {description} | ${publisherConfig.name.ja}`,
      en: `en {description} | ${publisherConfig.name.en}`,
    },
  },
};

/********************
// Example
export const en = {
  'Home.Title': 'Hi, Home!',
  'Home.Description': 'This is Home page!',
  'About.Title': 'Hi, About!',
  'About.Description': 'This is About page!',
  'Users.Title': 'Hi, Users!',
  'Users.Description': 'This is Users page!',
  'Counter.Label': 'Counted by {name}: ',
};
export const ja = {
  'Home.Title': 'やぁ、ホーム！',
  'Home.Description': 'ここはホームページです。',
  'About.Title': 'やぁ、アバウト',
  'About.Description': 'ここはアバウトページです',
  'Users.Title': 'やぁ、ユーザーズ',
  'Users.Description': 'ここはユーザーズページです',
  'Counter.Label': '{name}さんのカウント数: ',
};
********************/
function generateLocals(data, locale, result = {}, prefix?) {
  if (typeof data === 'object') {
    const keys = Object.keys(data);
    for (let key of keys) {
      const value = data[key];
      if (typeof value === 'object') {
        generateLocals(value, locale, result, prefix ? [prefix, key].join('.') : key);
      } else if (typeof value === 'string') {
        result[prefix] = data[locale];
      }
    }
  }
  return result;
}

const en = generateLocals(dic, 'en');
const ja = generateLocals(dic, 'ja');

export function chooseLocale(locale: string) {
  switch (locale) {
    case 'en':
      return en;
    case 'ja':
      return ja;
    default:
      return en;
  }
}

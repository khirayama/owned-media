import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import jaLocaleData from 'react-intl/locale-data/ja';

addLocaleData(enLocaleData);
addLocaleData(jaLocaleData);

export const supportLocales = [
  {
    value: 'en',
    display: 'English',
  },
  {
    value: 'ja',
    display: '日本語',
  },
];

export const en = {
  'Resources.Title': 'Resources',
  'Resources.Description': 'Resources',
  'Resources.Heading': 'Resources',
  'Resource.Title': 'Resource',
  'Resource.Description': 'Resource Page',
};

export const ja = {
  'Resources.Title': 'リソース一覧',
  'Resources.Description': 'リソース一覧',
  'Resources.Heading': 'リソース一覧',
  'Resource.Title': 'リソース',
  'Resource.Description': 'リソースページ',
};

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

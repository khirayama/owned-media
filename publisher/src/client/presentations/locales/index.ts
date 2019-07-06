import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import jaLocaleData from 'react-intl/locale-data/ja';

addLocaleData(enLocaleData);
addLocaleData(jaLocaleData);

export const en = {
  'Resources.Title': 'Resources',
  'Resources.Description': 'Resources Page',
  'Resource.Title': 'Resource',
  'Resource.Description': 'Resource Page',
};

export const ja = {
  'Resources.Title': 'リソース',
  'Resources.Description': 'リソースページ',
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

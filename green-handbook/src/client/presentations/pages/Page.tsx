import * as React from 'react';
import ReactHelmet from 'react-helmet';
import { IntlProvider, injectIntl, InjectedIntlProps } from 'react-intl';

import { chooseLocale } from '../../presentations/locales';

type Props = {
  locale: string;
  title: {
    descriptor: string;
    values: any;
  };
  description: {
    descriptor: string;
    values: any;
  };
  children: React.ReactNode;
};

export const Page = injectIntl(function(props: Props & InjectedIntlProps) {
  const locale = props.locale;
  const messages = chooseLocale(locale);
  const title: string = props.intl.formatMessage({ id: props.title.descriptor }, props.title.values || null);
  const description: string = props.intl.formatMessage(
    { id: props.description.descriptor },
    props.description.values || null,
  );

  return (
    <IntlProvider locale={locale} messages={messages}>
      <ReactHelmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </ReactHelmet>
      {props.children}
    </IntlProvider>
  );
});

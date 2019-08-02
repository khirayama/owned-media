import * as React from 'react';
import ReactHelmet from 'react-helmet';
import { IntlProvider, injectIntl, InjectedIntlProps } from 'react-intl';

import { chooseLocale } from '../../presentations/locales';

export type Props = {
  defaultLocale: string;
  locale: string;
  title: {
    descriptor: string;
    values?: any;
  };
  description: {
    descriptor: string;
    values?: any;
  };
  children: React.ReactNode;
  onUpdate: (props: Props) => void;
};

// TODO: Use withRouter for path, locale from react-router
export const Page = injectIntl(function(props: Props & InjectedIntlProps) {
  React.useEffect(() => {
    props.onUpdate(props);
  });

  const locale = props.locale || props.defaultLocale;
  const messages = chooseLocale(locale);
  const title: string = props.intl.formatMessage({ id: props.title.descriptor }, props.title.values || {});
  const description: string = props.intl.formatMessage(
    { id: props.description.descriptor },
    props.description.values || {},
  );

  return (
    <IntlProvider locale={locale} messages={messages}>
      <>
        <ReactHelmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </ReactHelmet>
        {props.children}
      </>
    </IntlProvider>
  );
});

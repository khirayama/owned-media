import * as React from 'react';
import { injectIntl } from 'react-intl';
import loadable from '@loadable/component';

import { Head } from '../../presentations/head/Head';
import { Application } from '../../presentations/templates/Application';

const LoadableAboutContent = loadable((): any =>
  import(/* webpackChunkName: "about" */ '../../presentations/pages/AboutContent').then(
    ({ AboutContent }) => AboutContent,
  ),
);

export const About = injectIntl(function(props) {
  const title: string = props.intl.formatMessage({ id: 'About.Title' });
  const description: string = props.intl.formatMessage({
    id: 'About.Description',
  });

  return (
    <Application>
      <Head title={title} description={description} />
      <LoadableAboutContent />
    </Application>
  );
});

import * as React from 'react';
import { injectIntl } from 'react-intl';

import { Head } from 'client/presentations/head/Head';
import { Application } from 'client/presentations/templates/Application';

export const Resources = injectIntl(function(props) {
  const title: string = props.intl.formatMessage({ id: 'Resources.Title' });
  const description: string = props.intl.formatMessage({
    id: 'Resources.Description',
  });

  return (
    <Application>
      <Head title={title} description={description} />
      <h1>Resources</h1>
    </Application>
  );
});

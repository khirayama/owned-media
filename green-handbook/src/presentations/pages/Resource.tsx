import * as React from 'react';
import { injectIntl } from 'react-intl';

import { Head } from '../../presentations/head/Head';
import { Application } from '../../presentations/templates/Application';
import { ResourceContent } from '../../containers/ResourceContent';

export const Resource = injectIntl(function(props: any) {
  const title: string = props.intl.formatMessage({ id: 'Resource.Title' }, { title: 'ok' });
  const description: string = props.intl.formatMessage({ id: 'Resource.Description' }, { description: 'okok' });
  const resourceId = props.match.params.key;

  return (
    <Application>
      <Head title={title} description={description} />
      <ResourceContent resourceId={resourceId} />
    </Application>
  );
});

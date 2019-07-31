import * as React from 'react';
import { injectIntl } from 'react-intl';

import { Page } from '../../presentations/pages/Page';
import { Application } from '../../presentations/templates/Application';
import { ResourceContent } from '../../containers/ResourceContent';

export const Resource = injectIntl(function(props: any) {
  const title: string = props.intl.formatMessage({ id: 'Resource.Title' }, { title: 'ok' });
  const description: string = props.intl.formatMessage({ id: 'Resource.Description' }, { description: 'okok' });
  const resourceId = props.match.params.key;

  return (
    <Page title={title} description={description}>
      <Application>
        <ResourceContent resourceId={resourceId} />
      </Application>
    </Page>
  );
});

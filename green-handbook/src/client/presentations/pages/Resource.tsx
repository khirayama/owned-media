import * as React from 'react';

import { Page, FormattedMessage } from '../../containers/Page';
import { Application } from '../../presentations/templates/Application';
import { ResourceContent } from '../../containers/ResourceContent';

export const Resource = (props: any) => {
  const resourceId = props.match.params.key;
  const title: FormattedMessage = { descriptor: 'Resource.Title', values: { title: 'Resource Title' } };
  const description: FormattedMessage = {
    descriptor: 'Resource.Description',
    values: { description: 'Resource Title' },
  };

  return (
    <Page title={title} description={description}>
      <Application>
        <ResourceContent resourceId={resourceId} />
      </Application>
    </Page>
  );
};

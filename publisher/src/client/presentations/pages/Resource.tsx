import * as React from 'react';
import { injectIntl } from 'react-intl';

import { ResourceForm } from '../../containers/ResourceForm';
import { LocaleBar } from '../../containers/LocaleBar';
import { Head } from '../head/Head';

export const Resource = injectIntl(function(props: any) {
  // const id = props.match.params.id || null;
  const title: string = props.intl.formatMessage({ id: 'Resource.Title' });
  const description: string = props.intl.formatMessage({
    id: 'Resource.Description',
  });

  return (
    <>
      <Head title={title} description={description} />
      <LocaleBar />
      <ResourceForm />
    </>
  );
});

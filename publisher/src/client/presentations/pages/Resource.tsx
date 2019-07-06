import * as React from 'react';
import { injectIntl } from 'react-intl';

import { ResourceForm } from '../components/ResourceForm';
import { LocaleBar } from '../../containers/LocaleBar';
import { Head } from '../head/Head';

export const Resource = injectIntl(function(props: any) {
  const title: string = props.intl.formatMessage({ id: 'Resource.Title' });
  const description: string = props.intl.formatMessage({
    id: 'Resource.Description',
  });
  const id = props.match.params.id || null;

  return (
    <>
      <Head title={title} description={description} />
      <LocaleBar />
      <ResourceForm resourceId={id} />
    </>
  );
});

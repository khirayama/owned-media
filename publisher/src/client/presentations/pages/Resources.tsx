import * as React from 'react';
import { injectIntl } from 'react-intl';

import { ResourceList } from '../../containers/ResourceList';
import { LocaleBar } from '../../containers/LocaleBar';
import { FlatLink } from '../components/Button';
import { Head } from '../head/Head';

export const Resources = injectIntl(function(props: any) {
  const title: string = props.intl.formatMessage({ id: 'Resources.Title' });
  const description: string = props.intl.formatMessage({
    id: 'Resources.Description',
  });

  return (
    <>
      <Head title={title} description={description} />
      <LocaleBar />
      <FlatLink to="/resources/new">CREATE NEW RESOURCE</FlatLink>
      <ResourceList />
    </>
  );
});

import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { ResourceList } from '../../containers/ResourceList';
import { LocaleBar } from '../../containers/LocaleBar';
import { FlatLink } from '../components/Button';
import { Head } from '../head/Head';

const Wrapper = styled.div`
  padding: 12px;

  & > h2 {
    margin: 12px 0 32px;
  }
`;

export const Resources = injectIntl(function(props: any) {
  const title: string = props.intl.formatMessage({ id: 'Resources.Title' });
  const description: string = props.intl.formatMessage({
    id: 'Resources.Description',
  });

  return (
    <Wrapper>
      <Head title={title} description={description} />
      <LocaleBar />
      <FormattedMessage tagName="h2" id="Resources.Heading" />
      <FlatLink to="/resources/new">CREATE NEW RESOURCE</FlatLink>
      <ResourceList />
    </Wrapper>
  );
});

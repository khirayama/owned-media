import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { ResourceForm } from '../../containers/ResourceForm';
import { LocaleBar } from '../../containers/LocaleBar';
import { FlatLink } from '../components/Button';
import { Head } from '../head/Head';

const Wrapper = styled.div`
  padding: 12px;

  & > h2 {
    margin: 12px 0;
  }

  & > a {
    margin: 0 0 16px;
  }
`;

interface Props extends RouteComponentProps {
  match: any;
  intl: any;
}

export const Resource = injectIntl(function(props: Props) {
  const resourceId = props.match.params.id || null;
  const title: string = props.intl.formatMessage({ id: 'Resource.Title' });
  const description: string = props.intl.formatMessage({
    id: 'Resource.Description',
  });

  return (
    <Wrapper>
      <Head title={title} description={description} />
      <LocaleBar />
      <FormattedMessage tagName="h2" id="Resource.Heading" />
      <FlatLink to="/">TO RESOURCE INDEX</FlatLink>
      <ResourceForm resourceId={resourceId} history={props.history} />
    </Wrapper>
  );
});

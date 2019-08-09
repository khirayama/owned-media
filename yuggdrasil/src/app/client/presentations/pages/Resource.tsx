import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Page } from '../../containers/Page';
import { ResourceForm } from '../../containers/ResourceForm';
import { FlatLink } from '../components/Button';

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
}

export const Resource = (props: Props) => {
  const resourceId = props.match.params.id || null;
  const title = { descriptor: 'Resource.Title' };
  const description = { descriptor: 'Resource.Description' };

  return (
    <Page title={title} description={description}>
      <Wrapper>
        <FormattedMessage tagName="h2" id="Resource.Heading" />
        <FlatLink to="/">TO RESOURCE INDEX</FlatLink>
        <ResourceForm resourceId={resourceId} history={props.history} />
      </Wrapper>
    </Page>
  );
};

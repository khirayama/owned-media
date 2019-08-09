import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Page } from '../../containers/Page';
import { ResourceList } from '../../containers/ResourceList';
import { FlatLink } from '../components/Button';

const Wrapper = styled.div`
  padding: 12px;

  & > h2 {
    margin: 12px 0 32px;
  }

  & > a {
    margin: 0 0 16px;
  }
`;

export const Resources = (props: any) => {
  const title = { descriptor: 'Resources.Title' };
  const description = { descriptor: 'Resources.Description' };

  return (
    <Page title={title} description={description}>
      <Wrapper>
        <FormattedMessage tagName="h2" id="Resources.Heading" />
        <FlatLink to="/resources/new">CREATE NEW RESOURCE</FlatLink>
        <ResourceList />
      </Wrapper>
    </Page>
  );
};

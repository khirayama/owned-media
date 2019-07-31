import * as React from 'react';
import * as styled from 'styled-components';
import { injectIntl } from 'react-intl';

import { Page } from '../../presentations/pages/Page';
import { Application } from '../../presentations/templates/Application';

const Wrapper = styled.default.div`
  color: blue;
`;

export const Home = injectIntl(function(props) {
  const title: string = props.intl.formatMessage({ id: 'Home.Title' });
  const description: string = props.intl.formatMessage({
    id: 'Home.Description',
  });

  return (
    <Page title={title} description={description}>
      <Application>
        <Wrapper>
          <h2>Home</h2>
        </Wrapper>
      </Application>
    </Page>
  );
});

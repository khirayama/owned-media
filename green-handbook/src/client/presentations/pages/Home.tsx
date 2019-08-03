import * as React from 'react';
import * as styled from 'styled-components';

import { Page } from '../../containers/Page';
import { FormattedMessage } from '../../presentations/components/Page';
import { Application } from '../../presentations/templates/Application';

const Wrapper = styled.default.div`
  color: blue;
`;

export const Home = () => {
  const title: FormattedMessage = { descriptor: 'Home.Title' };
  const description: FormattedMessage = { descriptor: 'Home.Description' };

  return (
    <Page title={title} description={description}>
      <Application>
        <Wrapper>
          <h2>Home</h2>
        </Wrapper>
      </Application>
    </Page>
  );
};

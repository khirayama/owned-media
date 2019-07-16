import * as React from 'react';
import * as styled from 'styled-components';

const Wrapper = styled.default.div`
  color: red;
`;

export function AboutContent() {
  return (
    <Wrapper>
      <h2>About</h2>
    </Wrapper>
  );
}

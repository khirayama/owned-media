import * as React from 'react';
import * as styled from 'styled-components';

const Wrapper = styled.default.div`
  color: green;
`;

export function UsersContent() {
  return (
    <Wrapper>
      <h2>Users</h2>
    </Wrapper>
  );
}

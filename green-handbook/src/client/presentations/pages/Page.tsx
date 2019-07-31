import * as React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export function Page(props: Props) {
  React.useEffect(() => {
    console.log(props);
  });

  return props.children || null;
}

import * as React from 'react';

import { Navigation } from '../components/Navigation';

type Props = {
  children: any;
};

export function Application(props: Props) {
  return (
    <>
      <Navigation />
      <div className="Content">{props.children}</div>
    </>
  );
}

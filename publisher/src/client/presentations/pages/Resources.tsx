import * as React from 'react';

import { ResourceList } from '../../containers/ResourceList';
import { FlatLink } from '../components/Button';

export function Resources() {
  return (
    <>
      <FlatLink to="/resources/new">CREATE NEW RESOURCE</FlatLink>
      <ResourceList />
    </>
  );
}

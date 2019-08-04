import * as React from 'react';

import { ResourceState } from '../../reducers/resources';
import { AppLink } from '../../containers/AppLink';

export interface Props {
  resource: ResourceState | null;
  onUpdate: (props: Props) => void;
}

export function ResourceContent(props: Props) {
  React.useEffect(() => {
    props.onUpdate(props);
  });

  let contents: JSX.Element | null = null;
  if (props.resource === null) {
    contents = null;
  } else if (props.resource.data === null && props.resource.isFetching.length) {
    contents = <div>Loading</div>;
  } else if (props.resource.data === null && !props.resource.isFetching.length) {
    contents = <div>404</div>;
  } else if (props.resource.data) {
    contents = <div>{props.resource.data.body}</div>;
  }

  return (
    <>
      <ul>
        <li>
          <AppLink to="/resources/fundamental-knowledge">Fundamental Knowledge</AppLink>
        </li>
        <li>
          <AppLink to="/resources/daily-care">Daily Care</AppLink>
        </li>
        <li>
          <AppLink to="/resources/no-key">404 content</AppLink>
        </li>
      </ul>
      {contents}
    </>
  );
}

import * as React from 'react';
import { Link } from 'react-router-dom';

import { ResourceState } from '../../reducers/resources';

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
  } else {
    contents = <div>{props.resource.data.body}</div>;
  }

  return (
    <>
      <ul>
        <li>
          <Link to="/notes/fundamental-knowledge">Fundamental Knowledge</Link>
        </li>
        <li>
          <Link to="/notes/daily-care">Daily Care</Link>
        </li>
        <li>
          <Link to="/notes/no-key">404 content</Link>
        </li>
      </ul>
      {contents}
    </>
  );
}

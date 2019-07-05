import * as React from 'react';

import { ResourceForm } from '../../../lib/components/ResourceForm';

export class Resource extends React.Component<any, any> {
  public render() {
    const id = this.props.match.params.id || null;
    const onClickResourcesLink = () => {
      this.props.history.push('/resources');
    };

    return <ResourceForm resourceId={id} onClickResourcesLink={onClickResourcesLink} />;
  }
}

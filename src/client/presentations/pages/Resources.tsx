import * as React from 'react';

import { ResourceList } from 'lib/components/ResourceList';
import { Props as ResourceListItemProps } from 'lib/components/ResourceListItem';

import { config } from 'config';

export class Resources extends React.Component<any, any> {
  public render() {
    const onClickNewResourceButton = () => {
      this.props.history.push(`${config.path.admin}/resources/new`);
    };

    const onClickEditResourceButton = (event: React.MouseEvent<HTMLButtonElement>, props: ResourceListItemProps) => {
      this.props.history.push(`${config.path.admin}/resources/${props.resource.id}`);
    };

    const onClickDeleteResourceButton = (event: React.MouseEvent<HTMLButtonElement>, props: ResourceListItemProps) => {
      const isDelete = window.confirm('Delete this resource?');
      if (isDelete) {
        console.log(`Delete ${props.resource.id}`);
      }
    };

    return (
      <ResourceList
        onClickNewResourceButton={onClickNewResourceButton}
        onClickEditResourceButton={onClickEditResourceButton}
        onClickDeleteResourceButton={onClickDeleteResourceButton}
      />
    );
  }
}

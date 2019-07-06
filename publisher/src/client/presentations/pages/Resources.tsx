import * as React from 'react';

import { Resource as ResourceService } from '../../services/Resource';
import { ResourceList } from '../components/ResourceList';
import { Props as ResourceListItemProps } from '../components/ResourceListItem';
import { FlatLink } from '../components/Button';

export class Resources extends React.Component<any, any> {
  public render() {
    const onClickDeleteResourceButton = (event: React.MouseEvent<HTMLButtonElement>, props: ResourceListItemProps) => {
      const isDelete = window.confirm('Delete this resource?');
      if (isDelete) {
        ResourceService.delete(props.resource.id);
      }
    };

    return (
      <>
        <FlatLink to="/resources/new">CREATE NEW RESOURCE</FlatLink>
        <ResourceList onClickDeleteResourceButton={onClickDeleteResourceButton} />
      </>
    );
  }
}

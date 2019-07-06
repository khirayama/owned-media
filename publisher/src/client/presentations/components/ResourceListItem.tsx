import * as React from 'react';

import { ResourceShape } from '../../../types';
import { FlatButton, FlatLink } from '../components/Button';
import { TableRow, TableCell } from '../components/Table';

export interface Props {
  resource: ResourceShape;
  onClickDeleteResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: Props, state: void) => void;
}

export class ResourceListItem extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.onClickDeleteResourceButton = this.onClickDeleteResourceButton.bind(this);
  }

  public render() {
    const resource: ResourceShape = this.props.resource;

    return (
      <TableRow>
        <TableCell>{resource.id}</TableCell>
        <TableCell>{resource.key}</TableCell>
        <TableCell>{resource.name}</TableCell>
        <TableCell>{resource.type}</TableCell>
        <TableCell>
          <FlatLink to={`/resources/${resource.id}`}>EDIT</FlatLink>
          <FlatButton onClick={this.onClickDeleteResourceButton}>DELETE</FlatButton>
        </TableCell>
      </TableRow>
    );
  }

  private onClickDeleteResourceButton(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (this.props.onClickDeleteResourceButton) {
      this.props.onClickDeleteResourceButton(event, this.props);
    }
  }
}

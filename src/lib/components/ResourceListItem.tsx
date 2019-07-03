import * as React from 'react';

import { ResourceShape } from 'lib/types';
import { FlatButton } from 'lib/components/Button';
import { TableRow, TableCell } from 'lib/components/Table';

export interface Props {
  resource: ResourceShape;
  onClickEditResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: Props, state: void) => void;
  onClickDeleteResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: Props, state: void) => void;
}

export class ResourceListItem extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.onClickEditResourceButton = this.onClickEditResourceButton.bind(this);
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
          <FlatButton onClick={this.onClickEditResourceButton}>EDIT</FlatButton>
          <FlatButton onClick={this.onClickDeleteResourceButton}>DELETE</FlatButton>
        </TableCell>
      </TableRow>
    );
  }

  private onClickEditResourceButton(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (this.props.onClickEditResourceButton) {
      this.props.onClickEditResourceButton(event, this.props);
    }
  }

  private onClickDeleteResourceButton(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (this.props.onClickDeleteResourceButton) {
      this.props.onClickDeleteResourceButton(event, this.props);
    }
  }
}

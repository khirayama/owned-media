import * as React from 'react';

import { ResourceShape } from 'lib/Resource';

export interface Props {
  resource: ResourceShape;
  onClickEditResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: Props, state: void) => void;
}

export class ResourceListItem extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.onClickEditResourceButton = this.onClickEditResourceButton.bind(this);
  }

  public render() {
    const resource: ResourceShape = this.props.resource;

    return (
      <tr>
        <td>{resource.id}</td>
        <td>{resource.name}</td>
        <td>{resource.type}</td>
        <td>
          <button onClick={this.onClickEditResourceButton}>EDIT</button>
        </td>
      </tr>
    );
  }

  private onClickEditResourceButton(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (this.props.onClickEditResourceButton) {
      this.props.onClickEditResourceButton(event, this.props);
    }
  }
}

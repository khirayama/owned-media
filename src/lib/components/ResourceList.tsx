import * as React from 'react';
import axios from 'axios';

import { config } from 'config';
import { ResourceShape } from 'lib/Resource';
import { ResourceListItem, Props as ResourceListItemProps } from 'lib/components/ResourceListItem';

interface State {
  resources: ResourceShape[];
}

interface Props {
  onClickNewResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: Props, state: State) => void;
  onClickEditResourceButton?: (
    event: React.MouseEvent<HTMLButtonElement>,
    props: ResourceListItemProps,
    state: void,
  ) => void;
}

export class ResourceList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      resources: [],
    };

    this.onClickNewResourceButton = this.onClickNewResourceButton.bind(this);
  }

  public componentDidMount() {
    axios.get(`${config.path.api}/resources`).then((res: any) => {
      this.setState({
        resources: res.data.sort((x: any, y: any) => {
          const xTime = new Date(x.updated_at).getTime();
          const yTime = new Date(y.updated_at).getTime();

          return xTime - yTime;
        }),
      });
    });
  }

  public render() {
    return (
      <div>
        <button onClick={this.onClickNewResourceButton}>CREATE NEW RESOURCE</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.resources.map((resource: any) => (
              <ResourceListItem
                key={resource.id}
                resource={resource}
                onClickEditResourceButton={this.props.onClickEditResourceButton}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  private onClickNewResourceButton(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (this.props.onClickNewResourceButton) {
      this.props.onClickNewResourceButton(event, this.props, this.state);
    }
  }
}

import * as React from 'react';
import styled from 'styled-components';

import { ResourceShape } from 'lib/types';
import { Resource as ResourceService } from 'lib/services/Resource';
import { ResourceListItem, Props as ResourceListItemProps } from 'lib/components/ResourceListItem';
import { FlatButton } from 'lib/components/Button';
import { Table, TableRow, TableHead, TableHeadCell } from 'lib/components/Table';

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
  onClickDeleteResourceButton?: (
    event: React.MouseEvent<HTMLButtonElement>,
    props: ResourceListItemProps,
    state: void,
  ) => void;
}

export const Wrapper = styled.div`
  padding: 24px 16px;

  h2 {
    font-weight: bold;
    margin-bottom: 36px;
  }

  button + table {
    margin-top: 24px;
  }

  tr {
    th:nth-of-type(5n + 1) {
      width: 20px;
    }
    th:nth-of-type(5n + 2) {
      width: 160px;
    }
    th:nth-of-type(5n + 4) {
      width: 80px;
    }
    th:nth-of-type(5n) {
      width: 132px;
    }
  }

  button + button {
    margin-left: 12px;
  }
`;

export class ResourceList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      resources: [],
    };

    this.onClickNewResourceButton = this.onClickNewResourceButton.bind(this);
  }

  public componentDidMount() {
    ResourceService.fetch().then((resources: ResourceShape[]) => {
      this.setState({
        resources: resources.sort((x: any, y: any) => {
          const xTime = new Date(x.updated_at).getTime();
          const yTime = new Date(y.updated_at).getTime();

          return xTime - yTime;
        }),
      });
    });
  }

  public render() {
    return (
      <Wrapper>
        <h2>Resources</h2>
        <FlatButton onClick={this.onClickNewResourceButton}>CREATE NEW RESOURCE</FlatButton>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Key</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Type</TableHeadCell>
              <TableHeadCell />
            </TableRow>
          </TableHead>
          <tbody>
            {this.state.resources.map((resource: any) => (
              <ResourceListItem
                key={resource.id}
                resource={resource}
                onClickEditResourceButton={this.props.onClickEditResourceButton}
                onClickDeleteResourceButton={this.props.onClickDeleteResourceButton}
              />
            ))}
          </tbody>
        </Table>
      </Wrapper>
    );
  }

  private onClickNewResourceButton(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (this.props.onClickNewResourceButton) {
      this.props.onClickNewResourceButton(event, this.props, this.state);
    }
  }
}

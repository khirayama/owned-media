import * as React from 'react';
import styled from 'styled-components';

import { ResourceList } from 'lib/components/ResourceList';
import { Props as ResourceListItemProps } from 'lib/components/ResourceListItem';

import { config } from 'config';

export const Wrapper = styled.div`
  padding: 24px 16px;

  h2 {
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
      width: 60px;
    }
    th:nth-of-type(5n) {
      width: 132px;
    }
  }

  button + button {
    margin-left: 12px;
  }
`;

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
      <Wrapper>
        <h2>Resources</h2>
        <ResourceList
          onClickNewResourceButton={onClickNewResourceButton}
          onClickEditResourceButton={onClickEditResourceButton}
          onClickDeleteResourceButton={onClickDeleteResourceButton}
        />
      </Wrapper>
    );
  }
}

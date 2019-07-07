import * as React from 'react';
import styled from 'styled-components';

import { ResourceWithAllLocalesShape } from '../../../types';
import { ResourceListItem, Props as ResourceListItemProps } from '../components/ResourceListItem';
import { Table, TableRow, TableHead, TableHeadCell } from '../components/Table';

export interface Props {
  resources: {
    isFetching: boolean[];
    data: ResourceWithAllLocalesShape[];
  };
  locale: string;
  onClickDeleteResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: ResourceListItemProps) => void;
  onMount?: (props: Props) => void;
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

export function ResourceList(props: Props) {
  React.useEffect(() => {
    if (props.onMount) {
      props.onMount(props);
    }
  }, []);

  return (
    <Wrapper>
      <h2>Resources</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Key</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <tbody>
          {props.resources.data.map((resource: ResourceWithAllLocalesShape) => (
            <ResourceListItem
              key={resource.id}
              resource={resource}
              locale={props.locale}
              onClickDeleteResourceButton={props.onClickDeleteResourceButton}
            />
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

import * as React from 'react';
import styled from 'styled-components';

import { ResourceWithAllLocalesShapeWithRelations } from '../../../types';
import { ResourceListItem, Props as ResourceListItemProps } from '../components/ResourceListItem';
import { Table, TableRow, TableHead, TableHeadCell } from '../components/Table';
import { State } from '../../reducers';

export interface Props {
  resources: State['resources'];
  locale: string;
  onClickDeleteResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: ResourceListItemProps) => void;
  onMount?: (props: Props) => void;
}

export const Wrapper = styled.div`
  font-size: 0.85rem;

  tr {
    th:nth-of-type(6n + 1) {
      width: 20px;
    }
    th:nth-of-type(6n + 2) {
      width: 160px;
    }
    th:nth-of-type(6n + 3) {
      width: 80px;
    }
    th:nth-of-type(6n) {
      width: 132px;
    }
  }

  small {
    color: #aaa;

    & + small {
      margin-left: 12px;
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
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>
              <div>ID</div>
            </TableHeadCell>
            <TableHeadCell>
              <div>Key</div>
            </TableHeadCell>
            <TableHeadCell>
              <div>Type</div>
            </TableHeadCell>
            <TableHeadCell>
              <div>Contents and Page</div>
            </TableHeadCell>
            <TableHeadCell>
              <div>Relations</div>
            </TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <tbody>
          {Object.keys(props.resources.data).map((resourceId: string) => {
            const resource: ResourceWithAllLocalesShapeWithRelations = props.resources.data[resourceId];
            return (
              <ResourceListItem
                key={resource.id}
                resource={resource}
                resources={props.resources.data}
                locale={props.locale}
                onClickDeleteResourceButton={props.onClickDeleteResourceButton}
              />
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
}

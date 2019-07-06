import * as React from 'react';

import { ResourceShape } from '../../../types';
import { FlatButton, FlatLink } from '../components/Button';
import { TableRow, TableCell } from '../components/Table';

export interface Props {
  resource: ResourceShape;
  onClickDeleteResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: Props) => void;
}

export function ResourceListItem(props: Props) {
  const resource: ResourceShape = props.resource;

  const onClickDeleteResourceButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (props.onClickDeleteResourceButton) {
      props.onClickDeleteResourceButton(event, props);
    }
  };

  return (
    <TableRow>
      <TableCell>{resource.id}</TableCell>
      <TableCell>{resource.key}</TableCell>
      <TableCell>{resource.name}</TableCell>
      <TableCell>{resource.type}</TableCell>
      <TableCell>
        <FlatLink to={`/resources/${resource.id}`}>EDIT</FlatLink>
        <FlatButton onClick={onClickDeleteResourceButton}>DELETE</FlatButton>
      </TableCell>
    </TableRow>
  );
}

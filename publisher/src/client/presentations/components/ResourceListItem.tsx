import * as React from 'react';

import { ResourceWithAllLocalesShape } from '../../../types';
import { FlatButton, FlatLink } from '../components/Button';
import { TableRow, TableCell } from '../components/Table';

export interface Props {
  resource: ResourceWithAllLocalesShape;
  locale: string;
  onClickDeleteResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: Props) => void;
}

export function ResourceListItem(props: Props) {
  const resource: ResourceWithAllLocalesShape = props.resource;

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
      <TableCell>{resource.type}</TableCell>
      <TableCell>{resource.name.ja}</TableCell>
      <TableCell>
        <FlatLink to={`/resources/${resource.id}`}>EDIT</FlatLink>
        <FlatButton onClick={onClickDeleteResourceButton}>DELETE</FlatButton>
      </TableCell>
    </TableRow>
  );
}

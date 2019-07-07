import * as React from 'react';

import { loadConfig } from '../../../utils';
import { ResourceWithAllLocalesShape } from '../../../types';
import { FlatButton, FlatLink } from '../components/Button';
import { TableRow, TableCell } from '../components/Table';

const config = loadConfig();

export interface Props {
  resource: ResourceWithAllLocalesShape;
  locale: string;
  onClickDeleteResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: Props) => void;
}

export function ResourceListItem(props: Props) {
  const resource: ResourceWithAllLocalesShape = props.resource;
  const locale: string = props.locale;

  const onClickDeleteResourceButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (props.onClickDeleteResourceButton) {
      props.onClickDeleteResourceButton(event, props);
    }
  };

  return (
    <>
      {config.locales.map((targetLocale, i) => {
        let contents: JSX.Element | null = null;
        if (i === 0) {
          contents = (
            <>
              <TableCell rowSpan={config.locales.length}>{resource.id}</TableCell>
              <TableCell rowSpan={config.locales.length}>{resource.key}</TableCell>
              <TableCell rowSpan={config.locales.length}>{resource.type}</TableCell>
              <TableCell>{resource.name[targetLocale]}</TableCell>
              <TableCell>{resource.page.title[targetLocale]}</TableCell>
              <TableCell>{resource.page.description[targetLocale]}</TableCell>
              <TableCell>{resource.page.keywords[targetLocale]}</TableCell>
              <TableCell rowSpan={config.locales.length}>
                <FlatLink to={`/resources/${resource.id}`}>EDIT</FlatLink>
                <FlatButton onClick={onClickDeleteResourceButton}>DELETE</FlatButton>
              </TableCell>
            </>
          );
        } else {
          contents = (
            <>
              <TableCell>{resource.name[targetLocale]}</TableCell>
              <TableCell>{resource.page.title[targetLocale]}</TableCell>
              <TableCell>{resource.page.description[targetLocale]}</TableCell>
              <TableCell>{resource.page.keywords[targetLocale]}</TableCell>
            </>
          );
        }

        return <TableRow key={`${resource.id}-${targetLocale}`}>{contents}</TableRow>;
      })}
    </>
  );
}

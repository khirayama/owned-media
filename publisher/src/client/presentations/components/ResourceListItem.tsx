import * as React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { loadConfig } from '../../../utils';
import { chooseLocale } from '../locales';
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
  // const locale: string = props.locale;

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
              <IntlProvider locale={targetLocale} messages={chooseLocale(targetLocale)}>
                <TableCell>
                  <p>{resource.name[targetLocale] || <FormattedMessage id="ResourceListItem.NoName" />}</p>
                  <small>
                    {resource.page.title[targetLocale] || <FormattedMessage id="ResourceListItem.NoTitle" />}
                  </small>
                  <small>
                    {resource.page.description[targetLocale] || (
                      <FormattedMessage id="ResourceListItem.NoDescription" />
                    )}
                  </small>
                  <small>
                    {resource.page.keywords[targetLocale] || <FormattedMessage id="ResourceListItem.NoKeywords" />}
                  </small>
                </TableCell>
              </IntlProvider>
              <TableCell rowSpan={config.locales.length} />
              <TableCell rowSpan={config.locales.length}>
                <FlatLink to={`/resources/${resource.id}`}>EDIT</FlatLink>
                <FlatButton onClick={onClickDeleteResourceButton}>DELETE</FlatButton>
              </TableCell>
            </>
          );
        } else {
          contents = (
            <IntlProvider locale={targetLocale} messages={chooseLocale(targetLocale)}>
              <TableCell>
                <p>{resource.name[targetLocale] || <FormattedMessage id="ResourceListItem.NoName" />}</p>
                <small>{resource.page.title[targetLocale] || <FormattedMessage id="ResourceListItem.NoTitle" />}</small>
                <small>
                  {resource.page.description[targetLocale] || <FormattedMessage id="ResourceListItem.NoDescription" />}
                </small>
                <small>
                  {resource.page.keywords[targetLocale] || <FormattedMessage id="ResourceListItem.NoKeywords" />}
                </small>
              </TableCell>
            </IntlProvider>
          );
        }

        return <TableRow key={`${resource.id}-${targetLocale}`}>{contents}</TableRow>;
      })}
    </>
  );
}

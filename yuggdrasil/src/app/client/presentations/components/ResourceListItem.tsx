import * as React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { ResourceWithAllLocalesShapeWithRelations } from '../../../types';
import { chooseLocale } from '../locales';
import { FlatButton, FlatLink } from '../components/Button';
import { TableRow, TableCell } from '../components/Table';

export interface Props {
  resource: ResourceWithAllLocalesShapeWithRelations;
  resources: { [key: string]: ResourceWithAllLocalesShapeWithRelations };
  locale: string;
  locales: string[];
  onClickDeleteResourceButton?: (event: React.MouseEvent<HTMLButtonElement>, props: Props) => void;
}

export function ResourceListItem(props: Props) {
  const resource = props.resource;
  const locale: string = props.locale;
  const targetLocales = locale === 'all' ? props.locales : [locale];

  const onClickDeleteResourceButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (props.onClickDeleteResourceButton) {
      props.onClickDeleteResourceButton(event, props);
    }
  };

  return (
    <>
      {targetLocales.map((targetLocale, i) => {
        let contents: JSX.Element | null = null;
        if (i === 0) {
          contents = (
            <>
              <TableCell rowSpan={targetLocales.length}>{resource.id}</TableCell>
              <TableCell rowSpan={targetLocales.length}>{resource.key}</TableCell>
              <TableCell rowSpan={targetLocales.length}>{resource.type}</TableCell>
              <IntlProvider locale={targetLocale} messages={chooseLocale(targetLocale)}>
                <TableCell>
                  <div>
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
                  </div>
                </TableCell>
              </IntlProvider>
              <TableCell>
                {resource.relations
                  .map((resourceId: string) => {
                    return props.resources[resourceId].name[targetLocale];
                  })
                  .join(',')}
              </TableCell>
              <TableCell rowSpan={targetLocales.length}>
                <FlatLink to={`/resources/${resource.id}`}>EDIT</FlatLink>
                <br />
                <FlatButton onClick={onClickDeleteResourceButton}>DELETE</FlatButton>
              </TableCell>
            </>
          );
        } else {
          contents = (
            <>
              <IntlProvider locale={targetLocale} messages={chooseLocale(targetLocale)}>
                <TableCell>
                  <div>
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
                  </div>
                </TableCell>
              </IntlProvider>
              <TableCell>
                {resource.relations
                  .map((resourceId: string) => {
                    return props.resources[resourceId].name[targetLocale];
                  })
                  .join(',')}
              </TableCell>
            </>
          );
        }

        return <TableRow key={`${resource.id}-${targetLocale}`}>{contents}</TableRow>;
      })}
    </>
  );
}

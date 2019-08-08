import * as React from 'react';
import styled from 'styled-components';

import { ResourceType } from '../../../../api';
import { ResourceWithAllLocalesShapeWithRelations } from '../../../types';
import { Props as RelationLabelProps, RelationLabel } from '../components/RelationLabel';

const Wrapper = styled.div`
  & > p {
    margin-bottom: 8px;

    & > span + span {
      margin-left: 24px;
    }
  }
`;

interface Props {
  resource: ResourceWithAllLocalesShapeWithRelations;
  resources: {
    [key: string]: ResourceWithAllLocalesShapeWithRelations;
  };
  locale: string;
  locales: string[];
  resourceTypes: ResourceType[];
  onChange: (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onClickRelationLabel?: (event: React.MouseEvent<HTMLButtonElement>, props: RelationLabelProps) => void;
}

export function ResourceTypeAttributeInput(props: any) {
  const rta = props.resourceTypeAttribute;
  const value = props.value;

  switch (rta.inputType) {
    case 'select': {
      return (
        <select value={value} name={`attributes.${rta.key}`} onChange={props.onChange}>
          {rta.options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      );
    }
    case 'number': {
      return <input type="number" value={value} name={`attributes.${rta.key}`} onChange={props.onChange} />;
    }
    case 'date': {
      return <input type="date" value={value} name={`attributes.${rta.key}`} onChange={props.onChange} />;
    }
  }
  return null;
}

export function ResourceInfo(props: Props) {
  const resource = props.resource;
  const locale: string = props.locale;
  const createdAt = resource.createdAt ? new Date(resource.createdAt) : null;
  const updatedAt = resource.updatedAt ? new Date(resource.updatedAt) : null;

  const targetLocales = locale === 'all' ? props.locales : [locale];

  function format(date: Date) {
    function zeroPadding(s: string) {
      return ('00' + s).slice(-2);
    }

    return `${date.getFullYear()}.${zeroPadding(String(date.getMonth() + 1))}.${zeroPadding(
      String(date.getDate()),
    )} ${zeroPadding(String(date.getHours()))}:${zeroPadding(String(date.getMinutes()))}`;
  }

  return (
    <Wrapper>
      <p>
        Resource Type:{' '}
        <select value={resource.type} name="type" onChange={props.onChange}>
          {props.resourceTypes.map((resourceType: any) => {
            return (
              <option key={resourceType.type} value={resourceType.type}>
                {resourceType.name}
              </option>
            );
          })}
        </select>
      </p>
      <p>
        <span>ID: {resource.id ? resource.id : 'Not Yet'}</span>
        <span>Created: {createdAt ? format(createdAt) : 'Not Yet'}</span>
        <span>Updated: {updatedAt ? format(updatedAt) : 'Not Yet'}</span>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Key</th>
            <td colSpan={targetLocales.length}>
              <input
                type="text"
                placeholder="Key for resource"
                value={resource.key}
                name="key"
                onChange={props.onChange}
              />
            </td>
          </tr>
          <tr>
            <th>Name</th>
            {targetLocales.map((locale: string) => {
              return (
                <td key={`name-${locale}`}>
                  <input
                    type="text"
                    placeholder={locale}
                    value={resource.name[locale]}
                    name={`name.${locale}`}
                    onChange={props.onChange}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Body Path</th>
            {targetLocales.map((locale: string) => {
              return (
                <td key={`body-path-${locale}`}>
                  <input
                    type="text"
                    placeholder={locale}
                    value={resource.bodyPath[locale]}
                    name={`bodyPath.${locale}`}
                    onChange={props.onChange}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Body Preview</th>
            {targetLocales.map((locale: string) => {
              return (
                <td key={`body-preview-${locale}`}>
                  <p>Preview</p>
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Image Url</th>
            {targetLocales.map((locale: string) => {
              return (
                <td key={`image-url-${locale}`}>
                  <input
                    type="text"
                    placeholder={locale}
                    value={resource.imageUrl[locale]}
                    name={`imageUrl.${locale}`}
                    onChange={props.onChange}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Image Preview</th>
            {targetLocales.map((locale: string) => {
              return (
                <td key={`image-preview-${locale}`}>
                  <img src={resource.imageUrl[locale]} />
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Page Title</th>
            {targetLocales.map((locale: string) => {
              return (
                <td key={`page-title-${locale}`}>
                  <input
                    type="text"
                    placeholder={locale}
                    value={resource.page.title[locale]}
                    name={`page.title.${locale}`}
                    onChange={props.onChange}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Page Description</th>
            {targetLocales.map((locale: string) => {
              return (
                <td key={`page-description-${locale}`}>
                  <input
                    type="text"
                    placeholder={locale}
                    value={resource.page.description[locale]}
                    name={`page.description.${locale}`}
                    onChange={props.onChange}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Page Keywords</th>
            {targetLocales.map((locale: string) => {
              return (
                <td key={`page-keywords-${locale}`}>
                  <input
                    type="text"
                    placeholder={locale}
                    value={resource.page.keywords[locale]}
                    name={`page.keywords.${locale}`}
                    onChange={props.onChange}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Page Image Url</th>
            {targetLocales.map((locale: string) => {
              return (
                <td key={`page-image-url-${locale}`}>
                  <input
                    type="text"
                    placeholder={locale}
                    value={resource.page.imageUrl[locale]}
                    name={`page.imageUrl.${locale}`}
                    onChange={props.onChange}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Image Preview</th>
            {targetLocales.map((locale: string) => {
              return (
                <td key={`page-image-preview-${locale}`}>
                  <img src={resource.page.imageUrl[locale]} />
                </td>
              );
            })}
          </tr>
          {props.resourceTypes.map(resourceType => {
            return resourceType.attributes && resourceType.type === resource.type
              ? resourceType.attributes.map(attr => {
                  return (
                    <tr key={attr.key}>
                      <th>{attr.key}</th>
                      <td colSpan={targetLocales.length}>
                        <ResourceTypeAttributeInput
                          resourceTypeAttribute={attr}
                          value={resource.attributes[attr.key]}
                          onChange={props.onChange}
                        />
                      </td>
                    </tr>
                  );
                })
              : null;
          })}
          <tr>
            <th>Relations</th>
            <td colSpan={targetLocales.length}>
              {props.resource.id
                ? Object.keys(props.resources).map((resourceId: string) => {
                    const targetResource: ResourceWithAllLocalesShapeWithRelations = props.resources[resourceId];
                    return targetResource ? (
                      <RelationLabel
                        key={resourceId}
                        resource={targetResource}
                        locales={targetLocales}
                        selected={resource.relations.indexOf(targetResource.id) !== -1}
                        disabled={targetResource.id === props.resource.id}
                        onClick={props.onClickRelationLabel}
                      />
                    ) : null;
                  })
                : 'Create resource first.'}
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
}

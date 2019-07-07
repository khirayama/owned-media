import * as React from 'react';
import * as styled from 'styled-components';

import { ResourceFullShape } from '../../../types';
import { loadConfig } from '../../../utils';

const config = loadConfig();

const Wrapper = styled.default.div`
  margin-bottom: 24px;
`;

export function ResourceInfo(props: {
  onChange: (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resourceFull: ResourceFullShape;
}) {
  const resourceFull = props.resourceFull;
  const createdAt = resourceFull.createdAt ? new Date(resourceFull.createdAt) : null;
  const updatedAt = resourceFull.updatedAt ? new Date(resourceFull.updatedAt) : null;

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
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>
              <p>{resourceFull.id ? resourceFull.id : 'Not Yet'}</p>
            </td>
          </tr>
          <tr>
            <th>Created</th>
            <td>
              <p>{createdAt ? format(createdAt) : 'Not Yet'}</p>
            </td>
          </tr>
          <tr>
            <th>Upadted</th>
            <td>
              <p>{updatedAt ? format(updatedAt) : 'Not Yet'}</p>
            </td>
          </tr>
          <tr>
            <th>Type</th>
            <td>
              <select value={resourceFull.type} name="type" onChange={props.onChange}>
                {config.resourceTypes.map((resourceType: any) => {
                  return (
                    <option key={resourceType.type} value={resourceType.type}>
                      {resourceType.name}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <th>Key</th>
            <td>
              <input
                type="text"
                placeholder="Key for resource"
                value={resourceFull.key}
                name="key"
                onChange={props.onChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
}

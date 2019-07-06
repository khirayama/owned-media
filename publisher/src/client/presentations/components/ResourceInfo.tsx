import * as path from 'path';

import * as React from 'react';
import * as styled from 'styled-components';

import { ResourceFullShape } from '../../../types';

const CONFIG_PATH = path.join(process.cwd(), 'config');
const { resourceTypes } = require(CONFIG_PATH);

const Wrapper = styled.default.div`
  margin-bottom: 24px;
`;

export function ResourceInfo(props: {
  onChange: (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resource: ResourceFullShape;
}) {
  const resource = props.resource;
  const createdAt = resource.createdAt ? new Date(resource.createdAt) : null;
  const updatedAt = resource.updatedAt ? new Date(resource.updatedAt) : null;

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
              <p>{resource.id ? resource.id : 'Not Yet'}</p>
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
              <select value={resource.type} name="type" onChange={props.onChange}>
                {resourceTypes.map((resourceType: any) => {
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
                value={resource.key}
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

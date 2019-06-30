import * as React from 'react';
import * as styled from 'styled-components';

import { resourceTypes } from 'config';

const Wrapper = styled.default.div`
  margin-bottom: 24px;
`;

export function ResourceInfo(props: {
  onChange: any;
  resource: { id: string; type: string; key: string; created_at: string; updated_at: string };
}) {
  const resource = props.resource;
  const createdAt = resource.created_at ? new Date(resource.created_at) : null;
  const updatedAt = resource.updated_at ? new Date(resource.updated_at) : null;

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
                {resourceTypes.map(resourceType => {
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

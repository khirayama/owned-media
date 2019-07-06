import * as path from 'path';

import * as React from 'react';
import * as styled from 'styled-components';

const CONFIG_PATH = path.join(process.cwd(), 'config');
const { resourceTypes } = require(CONFIG_PATH);

const Wrapper = styled.default.div`
  .text-center {
    text-align: center;
  }

  table {
    width: 100%;
    border: solid 1px #ccc;

    th {
      padding: 4px;
      font-weight: bold;
      width: 35%;
      text-align: left;
      border: solid 1px #ccc;
      vertical-align: top;
    }

    td {
      border: solid 1px #ccc;

      img {
        width: auto;
        max-height: 240px;
      }

      input,
      select {
        width: 100%;
        padding: 4px;
      }
    }
  }
`;

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

export function ResourceAttributes(props: any) {
  const resource = props.resource;
  const resourceType = props.resourceType;
  const resourceTypeAttributes =
    resourceTypes.filter((rType: any) => {
      return resourceType === rType.type;
    })[0].attributes || null;

  return (
    <Wrapper>
      <h2>ATTRIBUTES</h2>
      <table>
        <tbody>
          {resource && resourceTypeAttributes
            ? resourceTypeAttributes.map((resourceTypeAttribute: any) => {
                return (
                  <tr key={resourceTypeAttribute.key}>
                    <th>{resourceTypeAttribute.key}</th>
                    <td>
                      <ResourceTypeAttributeInput
                        resourceTypeAttribute={resourceTypeAttribute}
                        value={resource.attributes[resourceTypeAttribute.key]}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </Wrapper>
  );
}

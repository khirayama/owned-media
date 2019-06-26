import * as React from 'react';
import * as styled from 'styled-components';

import { config } from 'config';

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

      input {
        width: 100%;
        padding: 4px;
      }
    }
  }
`;

const Box = styled.default.div`
  display: flex;
  padding: 0 12px;
`;

const Column = styled.default.div`
  flex: 1;
`;

export function ResourcePage(props: any) {
  const resource = props.resource;

  return (
    <Wrapper>
      <h2>PAGE</h2>
      <Box>
        {config.locales.map((locale: string) => {
          return resource ? (
            <Column key={locale}>
              <table>
                <tbody>
                  <tr>
                    <th>Title</th>
                    <td>
                      <input
                        type="text"
                        value={resource.page.title[locale]}
                        name={`page.title.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>
                      <input
                        type="text"
                        value={resource.page.description[locale]}
                        name={`page.description.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Keywords</th>
                    <td>
                      <input
                        type="text"
                        value={resource.page.keywords[locale]}
                        name={`page.keywords.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Image URL</th>
                    <td>
                      <input
                        type="text"
                        value={resource.page.image_url[locale]}
                        name={`page.image_url.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Image Preview</th>
                    <td className="text-center">
                      <img src={resource.page.image_url[locale]} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Column>
          ) : null;
        })}
      </Box>
    </Wrapper>
  );
}

import * as React from 'react';
import * as styled from 'styled-components';

import { config } from 'config';

const Wrapper = styled.default.div`
  margin-bottom: 24px;
`;

export function ResourceContents(props: any) {
  const resource = props.resource;

  return (
    <Wrapper>
      <h3>Contents</h3>
      <div className="box">
        {config.locales.map((locale: string) => {
          return resource ? (
            <div key={locale} className="column">
              <table>
                <tbody>
                  <tr>
                    <th>Name({locale})</th>
                    <td>
                      <input
                        type="text"
                        value={resource.name[locale]}
                        name={`name.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Body Path({locale})</th>
                    <td>
                      <input
                        type="text"
                        value={resource.body_path[locale]}
                        name={`body_path.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Image URL({locale})</th>
                    <td>
                      <input
                        type="text"
                        value={resource.image_url[locale]}
                        name={`image_url.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Image Preview({locale})</th>
                    <td className="text-center">
                      <img src={resource.image_url[locale]} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null;
        })}
      </div>
    </Wrapper>
  );
}

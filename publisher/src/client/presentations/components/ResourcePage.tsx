import * as React from 'react';
import * as styled from 'styled-components';

import { ResourceFullShape } from '../../../types';
import { loadConfig } from '../../../utils';

const config = loadConfig();

interface Props {
  resourceFull: ResourceFullShape;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Wrapper = styled.default.div`
  margin-bottom: 24px;
`;

export function ResourcePage(props: Props) {
  const resourceFull = props.resourceFull;

  return (
    <Wrapper>
      <h3>Page</h3>
      <div className="box">
        {config.locales.map((locale: string) => {
          return resourceFull ? (
            <div key={locale} className="column">
              <table>
                <tbody>
                  <tr>
                    <th>Title({locale})</th>
                    <td>
                      <input
                        type="text"
                        value={resourceFull.page.title[locale]}
                        name={`page.title.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Description({locale})</th>
                    <td>
                      <input
                        type="text"
                        value={resourceFull.page.description[locale]}
                        name={`page.description.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Keywords({locale})</th>
                    <td>
                      <input
                        type="text"
                        value={resourceFull.page.keywords[locale]}
                        name={`page.keywords.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Image URL({locale})</th>
                    <td>
                      <input
                        type="text"
                        value={resourceFull.page.imageUrl[locale]}
                        name={`page.image_url.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Image Preview({locale})</th>
                    <td className="text-center">
                      <img src={resourceFull.page.imageUrl[locale]} />
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

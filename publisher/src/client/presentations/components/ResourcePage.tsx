import * as React from 'react';
import * as styled from 'styled-components';

import { ResourceWithAllLocalesShape } from '../../../types';
import { loadConfig } from '../../../utils';

const config = loadConfig();

interface Props {
  resource: ResourceWithAllLocalesShape;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Wrapper = styled.default.div`
  margin-bottom: 24px;
`;

export function ResourcePage(props: Props) {
  const resource = props.resource;

  return (
    <Wrapper>
      <h3>Page</h3>
      <div className="box">
        {config.locales.map((locale: string) => {
          return resource ? (
            <div key={locale} className="column">
              <table>
                <tbody>
                  <tr>
                    <th>Title({locale})</th>
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
                    <th>Description({locale})</th>
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
                    <th>Keywords({locale})</th>
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
                    <th>Image URL({locale})</th>
                    <td>
                      <input
                        type="text"
                        value={resource.page.imageUrl[locale]}
                        name={`page.image_url.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Image Preview({locale})</th>
                    <td className="text-center">
                      <img src={resource.page.imageUrl[locale]} />
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

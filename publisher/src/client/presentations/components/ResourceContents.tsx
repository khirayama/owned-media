import * as React from 'react';
import * as styled from 'styled-components';

import { ResourceFullShape } from '../../../types';
import { loadConfig } from '../../../utils';

const config = loadConfig();

const Wrapper = styled.default.div`
  margin-bottom: 24px;
`;

export interface Props {
  resourceFull: ResourceFullShape;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

export function ResourceContents(props: Props) {
  const resourceFull = props.resourceFull;

  return (
    <Wrapper>
      <h3>Contents</h3>
      <div className="box">
        {config.locales.map((locale: string) => {
          return resourceFull ? (
            <div key={locale} className="column">
              <table>
                <tbody>
                  <tr>
                    <th>Name({locale})</th>
                    <td>
                      <input
                        type="text"
                        value={resourceFull.name[locale]}
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
                        value={resourceFull.bodyPath[locale]}
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
                        value={resourceFull.imageUrl[locale]}
                        name={`image_url.${locale}`}
                        onChange={props.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Image Preview({locale})</th>
                    <td className="text-center">
                      <img src={resourceFull.imageUrl[locale]} />
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

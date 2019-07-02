/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import axios from 'axios';
import * as styled from 'styled-components';

import { config, resourceTypes } from 'config';
import { styles } from 'lib/components/styles';
import { ResourceShape } from 'lib/models/Resource';
import { Resource as ResourceService } from 'lib/services/Resource';
import { createLocaleObj, mergeDeep } from 'lib/utils';
import { ResourceInfo } from 'lib/components/ResourceInfo';
import { ResourceContents } from 'lib/components/ResourceContents';
import { ResourcePage } from 'lib/components/ResourcePage';
import { ResourceAttributes } from 'lib/components/ResourceAttributes';
import { FloatButton, FlatButton } from 'lib/components/Button';

interface State {
  resource: ResourceShape;
}

interface Props {
  resourceId: string;
  onClickResourcesLink?: (event: React.MouseEvent<HTMLButtonElement>, props: Props, state: State) => void;
}

const Wrapper = styled.default.div`
  h2 {
    font-weight: bold;
    margin-bottom: 8px;
  }

  h3 {
    font-weight: bold;
    margin-bottom: 8px;
  }

  input,
  select {
    font-weight: bold;
    padding: 4px;
    background: #eee;
  }

  .box {
    display: flex;

    .column {
      flex: 1;
    }

    .column-left {
      flex: 1;
      padding: 24px 16px;
      border-right: ${styles.border};
    }

    .column-right {
      flex: 3;
      padding: 24px 16px;
    }
  }

  .text-center {
    text-align: center;
  }

  table {
    width: 100%;
    border: ${styles.border};

    th {
      padding: 4px;
      font-weight: bold;
      width: 35%;
      text-align: left;
      border: ${styles.border};
      vertical-align: top;
    }

    td {
      border: ${styles.border};

      img {
        width: auto;
        max-height: 240px;
      }

      p {
        padding: 4px;
      }

      select,
      input {
        width: 100%;
        padding: 4px;
      }
    }
  }
`;

export class ResourceForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const defaultResource: ResourceShape = {
      id: '',
      type: resourceTypes[0].type,
      key: '',
      body: createLocaleObj(config.locales),
      bodyPath: createLocaleObj(config.locales),
      imageUrl: createLocaleObj(config.locales),
      name: createLocaleObj(config.locales),
      page: {
        title: createLocaleObj(config.locales),
        description: createLocaleObj(config.locales),
        imageUrl: createLocaleObj(config.locales),
        keywords: createLocaleObj(config.locales),
      },
      attributes: {},
      createdAt: '',
      updatedAt: '',
    };

    this.state = {
      resource: defaultResource,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickResourcesLink = this.onClickResourcesLink.bind(this);
  }

  private onChange(event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const currentResource = JSON.parse(JSON.stringify(this.state.resource));

    if (name === 'type') {
      currentResource.attributes = {};
      const resourceType = resourceTypes.filter(tmp => tmp.type === value)[0];
      if (resourceType && resourceType.attributes) {
        for (let attr of resourceType.attributes) {
          switch (attr.inputType) {
            case 'select': {
              currentResource.attributes[attr.key] = (attr as any).options[0].value;
              break;
            }
            case 'number': {
              currentResource.attributes[attr.key] = 0;
              break;
            }
            case 'date': {
              const now = new Date();
              currentResource.attributes[attr.key] = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
              break;
            }
          }
        }
      }
    }

    function setValue(obj: any, key: string, val: any) {
      const keys = key.split('.');
      let tmp = obj;
      for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i];
        if (typeof tmp[k] === 'object') {
          tmp = tmp[k];
        }
      }
      tmp[keys[keys.length - 1]] = val;
      return obj;
    }

    this.setState({ resource: setValue(currentResource, name, value) });
  }

  public componentDidMount() {
    const resourceId = this.props.resourceId;

    if (resourceId) {
      axios.get(`${config.path.api}/resources/${resourceId}?locale=all`).then((res: any) => {
        const resource = mergeDeep(this.state.resource, res.data);
        this.setState({ resource });
      });
    }
  }

  public render() {
    const resource = this.state.resource;

    return (
      <Wrapper>
        <form onSubmit={this.onSubmit}>
          <div className="box">
            <div className="column column-left">
              <h2>Resource</h2>
              <FlatButton onClick={this.onClickResourcesLink}>TO INDEX OF RESOURCES</FlatButton>
              <ResourceInfo resource={resource} onChange={this.onChange} />
              <FloatButton>SUBMIT</FloatButton>
            </div>
            <div className="column column-right">
              {resource ? (
                <div>
                  <ResourceContents resource={resource} onChange={this.onChange} />
                  <ResourcePage resource={resource} onChange={this.onChange} />
                  {Object.keys(resource.attributes).length ? (
                    <ResourceAttributes
                      resource={resource}
                      resourceType={this.state.resource.type}
                      onChange={this.onChange}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </Wrapper>
    );
  }

  private onClickResourcesLink(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (this.props.onClickResourcesLink) {
      this.props.onClickResourcesLink(event, this.props, this.state);
    }
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const resource = this.state.resource;

    if (this.props.resourceId) {
      console.log('UPDATE');
      console.log(this.state);
    } else {
      const firstLocale = config.locales[0];
      axios
        .post(
          `${config.path.admin}/resources?locale=${firstLocale}`,
          ResourceService.createResourceRequest(resource, firstLocale),
        )
        .then(res => {
          const resourceId = res.data.resource.id;
          Promise.all(
            config.locales.slice(1, config.locales.length).map(locale => {
              return axios.put(
                `${config.path.admin}/resources/${resourceId}?locale=${locale}`,
                ResourceService.createResourceRequest(resource, locale),
              );
            }),
          ).then(() => {
            console.log('Done!');
          });
        });
    }
  }
}

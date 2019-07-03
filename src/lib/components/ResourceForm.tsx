/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import * as styled from 'styled-components';

import { config, resourceTypes } from 'config';
import { styles } from 'lib/components/styles';
import { Resource as ResourceService } from 'lib/services/Resource';
import { createLocaleObj, mergeDeep } from 'lib/utils';
import { ResourceInfo } from 'lib/components/ResourceInfo';
import { ResourceContents } from 'lib/components/ResourceContents';
import { ResourcePage } from 'lib/components/ResourcePage';
import { ResourceAttributes } from 'lib/components/ResourceAttributes';
import { FloatButton, FlatButton } from 'lib/components/Button';
import { resourceFullToResource, resourceToPartialResourceFull } from 'lib/utils';
import { ResourceFullShape, ResourceShape } from 'lib/types';

interface State {
  resource: ResourceFullShape;
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

    const defaultResource: ResourceFullShape = {
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
      ResourceService.find(resourceId, { locale: 'all' }).then((resource) => {
        const newResource = mergeDeep(this.state.resource, resource);
        this.setState({ resource: newResource });
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
    const resourceId = this.props.resourceId;
    const resource = this.state.resource;

    if (resourceId) {
      Promise.all(
        config.locales.map(locale => {
          return ResourceService.update(resourceId, resourceFullToResource(resource, locale), { locale });
        }),
      ).then(res => {
        for (let i = 0; i < config.locales.length; i += 1) {
          const locale = config.locales[i];
          const newResource = res[i];
          this.setState({
            resource: resourceToPartialResourceFull(newResource, locale),
          });
        }
      });
    } else {
      const firstLocale = config.locales[0];
      const otherLocales = config.locales.slice(1, config.locales.length);
      ResourceService.create(resourceFullToResource(resource, firstLocale), { locale: firstLocale }).then(
        (newResource: ResourceShape) => {
          Promise.all(
            otherLocales.map(locale => {
              return ResourceService.update(newResource.id, resourceFullToResource(resource, locale), { locale });
            }),
          ).then(res => {
            for (let i = 0; i < otherLocales.length; i += 1) {
              const locale = otherLocales[i];
              const newResource = res[i];
              this.setState({
                resource: resourceToPartialResourceFull(newResource, locale),
              });
            }
          });
        },
      );
    }
  }
}

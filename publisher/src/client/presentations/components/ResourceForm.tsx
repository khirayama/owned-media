/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import * as styled from 'styled-components';

import { styles } from '../styles/vars';
import { Resource as ResourceService } from '../../services/Resource';
import { ResourceInfo } from '../components/ResourceInfo';
import { ResourceContents } from '../components/ResourceContents';
import { ResourcePage } from '../components/ResourcePage';
import { ResourceAttributes } from '../components/ResourceAttributes';
import { FloatButton, FlatLink } from '../components/Button';
import { createLocaleObj, mergeDeep, resourceFullToResource, resourceToPartialResourceFull } from '../../../utils';
import { ResourceFullShape, ResourceShape } from '../../../types';
import { loadConfig } from '../../../utils';
import { State } from '../../reducers';

const config = loadConfig();

interface OwnState {
  resourceFull: ResourceFullShape;
}

export interface Props {
  resourceFull: State['resourceFull'];
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

export class ResourceForm extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);

    const defaultResource: ResourceFullShape = {
      id: '',
      type: config.resourceTypes[0].type,
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
      resourceFull: props.resourceFull.data || defaultResource,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  private onChange(event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const currentResource = JSON.parse(JSON.stringify(this.state.resourceFull));

    if (name === 'type') {
      currentResource.attributes = {};
      const resourceType = config.resourceTypes.filter((tmp: any) => tmp.type === value)[0];
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

    this.setState({ resourceFull: setValue(currentResource, name, value) });
  }

  public componentDidMount() {
    const data = this.props.resourceFull.data;
    const resourceId = data ? data.id : null;

    if (resourceId) {
      ResourceService.find(resourceId, { locale: 'all' }).then(resourceFull => {
        const newResourceFull = mergeDeep(this.state.resourceFull, resourceFull);
        this.setState({ resourceFull: newResourceFull });
      });
    }
  }

  public render() {
    const resourceFull = this.state.resourceFull;

    return (
      <Wrapper>
        <form onSubmit={this.onSubmit}>
          <div className="box">
            <div className="column column-left">
              <h2>Resource</h2>
              <FlatLink to="/">TO INDEX OF RESOURCES</FlatLink>
              <ResourceInfo resourceFull={resourceFull} onChange={this.onChange} />
              <FloatButton>SUBMIT</FloatButton>
            </div>
            <div className="column column-right">
              {resourceFull ? (
                <div>
                  <ResourceContents resourceFull={resourceFull} onChange={this.onChange} />
                  <ResourcePage resourceFull={resourceFull} onChange={this.onChange} />
                  {Object.keys(resourceFull.attributes).length ? (
                    <ResourceAttributes
                      resourceFull={resourceFull}
                      resourceType={this.state.resourceFull.type}
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

  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = this.props.resourceFull.data;
    const resourceId = data ? data.id : null;
    const resourceFull = this.state.resourceFull;

    if (resourceId) {
      Promise.all(
        config.locales.map((locale: string) => {
          return ResourceService.update(resourceId, resourceFullToResource(resourceFull, locale), { locale });
        }),
      ).then(res => {
        for (let i = 0; i < config.locales.length; i += 1) {
          const locale = config.locales[i];
          const tmpResource: ResourceShape = res[i] as ResourceShape;
          this.setState({
            resourceFull: mergeDeep({}, this.state.resourceFull, resourceToPartialResourceFull(tmpResource, locale)),
          });
        }
      });
    } else {
      const firstLocale = config.locales[0];
      const otherLocales = config.locales.slice(1, config.locales.length);
      ResourceService.create(resourceFullToResource(resourceFull, firstLocale), { locale: firstLocale }).then(
        (newResource: ResourceShape) => {
          this.setState({
            resourceFull: mergeDeep(
              {},
              this.state.resourceFull,
              resourceToPartialResourceFull(newResource, firstLocale),
            ),
          });
          Promise.all(
            otherLocales.map((locale: string) => {
              return ResourceService.update(newResource.id, resourceFullToResource(resourceFull, locale), { locale });
            }),
          ).then(res => {
            for (let i = 0; i < otherLocales.length; i += 1) {
              const locale = otherLocales[i];
              const tmpResource: ResourceShape = res[i] as ResourceShape;
              this.setState({
                resourceFull: mergeDeep(
                  {},
                  this.state.resourceFull,
                  resourceToPartialResourceFull(tmpResource, locale),
                ),
              });
            }
          });
        },
      );
    }
  }
}

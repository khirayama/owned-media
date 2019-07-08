/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import * as styled from 'styled-components';

import { styles } from '../styles/vars';
import { Resource as ResourceService } from '../../services/Resource';
import { ResourceInfo } from '../components/ResourceInfo';
import { FloatButton } from '../components/Button';
import {
  createLocaleObj,
  mergeDeep,
  resourceWithAllLocalesToResource,
  resourceToPartialResourceWithAllLocales,
} from '../../../utils';
import { ResourceWithAllLocalesShape, ResourceShape } from '../../../types';
import { loadConfig } from '../../../utils';
import { State } from '../../reducers';

const config = loadConfig();

interface OwnState {
  resource: ResourceWithAllLocalesShape;
}

export interface Props {
  resourceId: string | null;
  resource: State['resource'];
  locale: string;
  onMount?: (props: Props) => void;
}

const Wrapper = styled.default.div`
  input,
  select {
    font-weight: bold;
    padding: 4px;
    background: #eee;
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

const defaultResource: ResourceWithAllLocalesShape = {
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

export class ResourceForm extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      resource: props.resource.data || defaultResource,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  private onChange(event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const currentResource = JSON.parse(JSON.stringify(this.state.resource));

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

    this.setState({ resource: setValue(currentResource, name, value) });
  }

  public componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props);
    }
  }

  public componentDidUpdate(props: Props) {
    if (!props.resourceId) {
      this.setState({ resource: defaultResource });
    } else if (this.props.resource.data && this.state.resource.id !== this.props.resource.data.id) {
      this.setState({ resource: this.props.resource.data });
    }
  }

  public render() {
    const resource = this.state.resource;

    return (
      <Wrapper>
        <form onSubmit={this.onSubmit}>
          <ResourceInfo resource={resource} locale={this.props.locale} onChange={this.onChange} />
          <FloatButton>SUBMIT</FloatButton>
        </form>
      </Wrapper>
    );
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = this.props.resource.data;
    const resourceId = data ? data.id : null;
    const resource = this.state.resource;

    if (resourceId) {
      Promise.all(
        config.locales.map((locale: string) => {
          return ResourceService.update(resourceId, resourceWithAllLocalesToResource(resource, locale), { locale });
        }),
      ).then(res => {
        for (let i = 0; i < config.locales.length; i += 1) {
          const locale = config.locales[i];
          const tmpResource: ResourceShape = res[i] as ResourceShape;
          this.setState({
            resource: mergeDeep({}, this.state.resource, resourceToPartialResourceWithAllLocales(tmpResource, locale)),
          });
        }
      });
    } else {
      const firstLocale = config.locales[0];
      const otherLocales = config.locales.slice(1, config.locales.length);
      ResourceService.create(resourceWithAllLocalesToResource(resource, firstLocale), { locale: firstLocale }).then(
        (newResource: ResourceShape) => {
          this.setState({
            resource: mergeDeep(
              {},
              this.state.resource,
              resourceToPartialResourceWithAllLocales(newResource, firstLocale),
            ),
          });
          Promise.all(
            otherLocales.map((locale: string) => {
              return ResourceService.update(newResource.id, resourceWithAllLocalesToResource(resource, locale), {
                locale,
              });
            }),
          ).then(res => {
            for (let i = 0; i < otherLocales.length; i += 1) {
              const locale = otherLocales[i];
              const tmpResource: ResourceShape = res[i] as ResourceShape;
              this.setState({
                resource: mergeDeep(
                  {},
                  this.state.resource,
                  resourceToPartialResourceWithAllLocales(tmpResource, locale),
                ),
              });
            }
          });
        },
      );
    }
  }
}

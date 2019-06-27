/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as styled from 'styled-components';

import { config, resourceTypes } from 'config';
import { ResourceInfo } from 'lib/components/ResourceInfo';
import { ResourceContents } from 'lib/components/ResourceContents';
import { ResourcePage } from 'lib/components/ResourcePage';
import { ResourceAttributes } from 'lib/components/ResourceAttributes';

const Wrapper = styled.default.div`
  padding: 12px;

  h2 {
    font-weight: bold;
    padding: 12px 8px;
  }

  input,
  select {
    font-weight: bold;
    padding: 4px;
    background: #eee;
  }
`;

function createLocaleObj(locales: string[]) {
  const obj = {};
  for (let locale of locales) {
    obj[locale] = '';
  }
  return obj;
}

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function mergeDeep(target: any, ...sources: any): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export class Resource extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const defaultResource = {
      id: '',
      type: resourceTypes[0].type,
      key: '',
      body: createLocaleObj(config.locales),
      body_path: createLocaleObj(config.locales),
      image_url: createLocaleObj(config.locales),
      name: createLocaleObj(config.locales),
      page: {
        title: createLocaleObj(config.locales),
        description: createLocaleObj(config.locales),
        image_url: createLocaleObj(config.locales),
        keywords: createLocaleObj(config.locales),
      },
      attributes: {},
      created_at: '',
      updated_at: '',
    };

    this.state = {
      id: props.match.params.id,
      resource: defaultResource,
    };

    this.onChange = this.onChange.bind(this);
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
    const resourceId = this.props.match.params.id || null;

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
        <Link to={`${config.path.admin}/resources`}>TO INDEX OF RESOURCES</Link>
        {resource ? (
          <div>
            <ResourceInfo resource={resource} onChange={this.onChange} />
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
      </Wrapper>
    );
  }
}

/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as styled from 'styled-components';

import { config, resourceTypes } from 'config';
import { ResourceInfo } from 'client/presentations/pages/ResourceInfo';
import { ResourceContents } from 'client/presentations/pages/ResourceContents';
import { ResourcePage } from 'client/presentations/pages/ResourcePage';
import { ResourceAttributes } from 'client/presentations/pages/ResourceAttributes';

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

    function setValue(key: string, obj: any, val: any) {
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

    this.setState({ resource: setValue(name, this.state.resource, value) });
  }

  public componentDidMount() {
    axios.get(`/api/v1/resources/${this.state.id}?locale=all`).then((res: any) => {
      this.setState({ resource: res.data });
    });
  }

  public render() {
    const resource = this.state.resource;

    return (
      <div>
        <Link to="/resources">TO INDEX OF RESOURCES</Link>
        {resource ? (
          <div>
            <ResourceInfo resource={resource} onChange={this.onChange} />
            <h2>CONTENTS</h2>
            <Box>
              {config.locales.map((locale: string) => {
                return resource ? (
                  <Column key={locale}>
                    {resource.name[locale] || ''}
                    {resource.body_path[locale] || ''}
                    <ResourceBody html={resource.body[locale] || ''} />
                    {resource.image_url[locale] || ''}
                    <img src={resource.image_url[locale] || ''} />
                  </Column>
                ) : null;
              })}
            </Box>
            <h2>PAGE</h2>
            <Box>
              {config.locales.map((locale: string) => {
                return resource ? (
                  <Column key={locale}>
                    {resource.page.title[locale] || ''}
                    {resource.page.description[locale] || ''}
                    {resource.page.keywords[locale] || ''}
                    {resource.page.image_url[locale] || ''}
                    <img src={resource.page.image_url[locale] || ''} />
                  </Column>
                ) : null;
              })}
            </Box>
            <h2>DEFINED ATTRIBUTES</h2>
            <h2>CUSTOM ATTRIBUTES</h2>
          </div>
        ) : null}
      </div>
    );
  }
}

import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as styled from 'styled-components';

import { config, resourceTypes } from 'config';

const ResourceInfoWrapper = styled.default.div`
  font-weight: bold;
`;

const Box = styled.default.div`
  display: flex;
`;

const Column = styled.default.div`
  flex: 1;
`;

function ResourceBody(props: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: props.html }} />;
}

function ResourceInfo(props: {
  onChange: any;
  resource: { id: string; type: string; key: string; created_at: string; updated_at: string };
}) {
  const resource = props.resource;
  const createdAt = resource.created_at ? new Date(resource.created_at) : new Date();
  const updatedAt = resource.updated_at ? new Date(resource.updated_at) : new Date();

  function format(date: Date) {
    function zeroPadding(s: string) {
      return ('00' + s).slice(-2);
    }

    return `${date.getFullYear()}.${zeroPadding(String(date.getMonth() + 1))}.${zeroPadding(
      String(date.getDate()),
    )} ${zeroPadding(String(date.getHours()))}:${zeroPadding(String(date.getMinutes()))}`;
  }

  return (
    <ResourceInfoWrapper>
      <div>ID: {resource.id}</div>
      <div>
        UPDATED: {format(updatedAt)} - CREATED: {format(createdAt)}
      </div>
      <div>
        <input type="text" placeholder="resource-key" value={resource.key} name="key" onChange={props.onChange} />
        <select value={resource.type} name="type" onChange={props.onChange}>
          {resourceTypes.map(resourceType => {
            return (
              <option key={resourceType.type} value={resourceType.type}>
                {resourceType.name}
              </option>
            );
          })}
        </select>
      </div>
    </ResourceInfoWrapper>
  );
}

export class Resource extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: props.match.params.id,
      resource: null,
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
        if (typeof k === 'object') {
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

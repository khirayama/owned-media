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

    const resource = {};
    for (let locale of config.locales) {
      resource[locale] = null;
    }

    this.state = {
      id: props.match.params.id,
      // TODO: 構造作り直す
      resource,
    };

    this.onChange = this.onChange.bind(this);
  }

  private onChange(event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    console.log(name, value);
  }

  public componentDidMount() {
    Promise.all(config.locales.map(locale => axios.get(`/api/v1/resources/${this.state.id}?locale=${locale}`))).then(
      (res: any) => {
        const resource = {};
        for (let r of res) {
          const paramsString = r.config.url.split('?')[1];
          const paramStrings = paramsString.split('&');
          for (let paramString of paramStrings) {
            const keyValue = paramString.split('=');
            const key = keyValue[0];
            const value = keyValue[1];
            if (key === 'locale') {
              resource[value] = r.data;
            }
          }
        }
        this.setState({ resource });
      },
    );
  }

  public render() {
    const defaultResource = this.state.resource[config.locales[0]];

    return (
      <div>
        <Link to="/resources">TO INDEX OF RESOURCES</Link>
        {defaultResource ? (
          <div>
            <ResourceInfo resource={defaultResource} onChange={this.onChange} />
            <h2>CONTENTS</h2>
            <Box>
              {config.locales.map((locale: string) => {
                const resource = this.state.resource[locale];
                return resource ? (
                  <Column key={locale}>
                    {resource.name}
                    {resource.body_path}
                    <ResourceBody html={resource.body} />
                    {resource.image_url}
                    <img src={resource.image_url} />
                  </Column>
                ) : null;
              })}
            </Box>
            <h2>PAGE</h2>
            <Box>
              {config.locales.map((locale: string) => {
                const resource = this.state.resource[locale];
                return resource ? (
                  <Column key={locale}>
                    {resource.page.title}
                    {resource.page.description}
                    {resource.page.keywords}
                    {resource.page.image_url}
                    <img src={resource.page.image_url} />
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

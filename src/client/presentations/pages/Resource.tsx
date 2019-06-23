import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { config } from 'config';

function ResourceBody(props: { html: string }) {
  return <div dangerouslySetInnerHTML={{__html: props.html}} />;
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
      resource,
    };
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
            {defaultResource.id}
            {defaultResource.type}
            {defaultResource.created_at}
            {defaultResource.updated_at}
            <h2>CONTENTS</h2>
            {config.locales.map((locale: string) => {
              const resource = this.state.resource[locale];
              return resource ? (
                <div key={locale}>
                  {resource.name}
                  {resource.body_path}
                  <ResourceBody html={resource.body} />
                  {resource.image_url}
                  <img src={resource.image_url} />
                </div>
              ) : null;
            })}
            <h2>PAGE</h2>
            {config.locales.map((locale: string) => {
              const resource = this.state.resource[locale];
              return resource ? (
                <div key={locale}>
                  {resource.page.title}
                  {resource.page.description}
                  {resource.page.keywords}
                  {resource.page.image_url}
                  <img src={resource.page.image_url} />
                </div>
              ) : null;
            })}
            <h2>ATTRIBUTES</h2>
          </div>
        ) : null}
      </div>
    );
  }
}

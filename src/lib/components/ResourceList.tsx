import * as React from 'react';
import axios from 'axios';

import { config } from 'config';

export class ResourceList extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);

    this.state = {
      resources: [],
    };
  }

  public componentDidMount() {
    axios.get(`${config.path.api}/resources`).then((res: any) => {
      this.setState({
        resources: res.data.sort((x: any, y: any) => {
          const xTime = new Date(x.updated_at).getTime();
          const yTime = new Date(y.updated_at).getTime();

          return xTime - yTime;
        }),
      });
    });
  }

  public render() {
    const baseUrl = config.path.admin;

    return (
      <div>
        <a href={`${baseUrl}/resources/new`}>CREATE NEW RESOURCE</a>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.resources.map((resource: any) => (
              <tr key={resource.id}>
                <td>{resource.id}</td>
                <td>{resource.name}</td>
                <td>{resource.type}</td>
                <td>
                  <a href={`${baseUrl}/resources/${resource.id}`}>EDIT</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

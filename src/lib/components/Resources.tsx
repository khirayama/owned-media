import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class Resources extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      resources: [],
    };
  }

  public componentDidMount() {
    axios.get('/api/v1/resources').then(res => {
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
    return (
      <div>
        <Link to="/resources/new">CREATE NEW RESOURCE</Link>
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
                  <Link to={`/resources/${resource.id}`}>EDIT</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

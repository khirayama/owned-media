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
      <ul>
        <li>
          <Link to="/resources/new">CREATE NEW RESOURCE</Link>
        </li>
        {this.state.resources.map((resource: any) => (
          <li key={resource.id}>
            <Link to={`/resources/${resource.id}`}>
              {resource.name}
              {resource.created_at}
              {resource.updated_at}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

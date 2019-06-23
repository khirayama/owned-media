import * as React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

export class Resource extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: props.match.params.id,
      resource: null,
    };
  }

  public componentDidMount() {
    axios.get(`/api/v1/resources/${this.state.id}`).then(res => {
      this.setState({
        resource: res.data,
      });
    });
  }

  public render() {
    const resource = this.state.resource;

    console.log(resource);
    return resource ? (
      <div>
        {resource.name}
        {resource.body}
        {resource.created_at}
        {resource.updated_at}
      </div>
    ) : null;
  }
}

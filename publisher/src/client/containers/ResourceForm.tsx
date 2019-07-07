import { connect } from 'react-redux';

import { ResourceForm as Component } from '../presentations/components/ResourceForm';
import { State } from '../reducers';

const mapStateToProps = (state: State) => {
  return {
    resourceFull: state.resourceFull,
  };
};

export const ResourceForm = connect(mapStateToProps)(Component);

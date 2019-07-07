import { connect } from 'react-redux';

import { ResourceForm as Component } from '../presentations/components/ResourceForm';
import { State } from '../reducers';

interface Props {
  resourceId: string | null;
}

const mapStateToProps = (state: State, props: Props) => {
  return {
    resourceId: props.resourceId,
    resourceFull: state.resourceFull,
  };
};

export const ResourceForm = connect(mapStateToProps)(Component);

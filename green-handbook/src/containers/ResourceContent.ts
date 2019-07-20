import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { State } from '../reducers';
import {
  Props as ResourceContentProps,
  ResourceContent as Component,
} from '../presentations/components/ResourceContent';
import { fetchResource } from '../usecases';

interface Props {
  resourceId: string | null;
}

const mapStateToProps = (state: State, props: Props) => {
  return {
    resource: props.resourceId ? state.resources[props.resourceId] || null : null,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>, props: Props) => {
  return {
    onUpdate: (resourceContentProps: ResourceContentProps) => {
      if (resourceContentProps.resource === null && props.resourceId) {
        dispatch(fetchResource(props.resourceId));
      }
    },
  };
};

export const ResourceContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

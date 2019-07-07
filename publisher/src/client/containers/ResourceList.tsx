import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { Props, ResourceList as Component } from '../presentations/components/ResourceList';
import { Props as ResourceListItemProps } from '../presentations/components/ResourceListItem';
import { fetchResources, deleteResource } from '../usecases';
import { State } from '../reducers';

const mapStateToProps = (state: State) => {
  return {
    resources: state.resources,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    onMount: (props: Props) => {
      if (!props.resources.data.length || props.resources.hasChange) {
        dispatch(fetchResources());
      }
    },
    onClickDeleteResourceButton: (event: React.MouseEvent<HTMLButtonElement>, props: ResourceListItemProps) => {
      dispatch(deleteResource(props.resource.id));
    },
  };
};

export const ResourceList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

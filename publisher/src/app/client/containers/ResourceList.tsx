import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { ResourceList as Component } from '../presentations/components/ResourceList';
import { Props as ResourceListItemProps } from '../presentations/components/ResourceListItem';
import { fetchResources, deleteResource } from '../usecases';
import { State } from '../reducers';

const mapStateToProps = (state: State) => {
  return {
    resources: state.resources,
    locale: state.ui.resourceLocale,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    onMount: () => {
      dispatch(fetchResources());
    },
    onClickDeleteResourceButton: (event: React.MouseEvent<HTMLButtonElement>, props: ResourceListItemProps) => {
      const isDelete = window.confirm('Delete this resource?');
      if (isDelete) {
        dispatch(deleteResource(props.resource.id));
      }
    },
  };
};

export const ResourceList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

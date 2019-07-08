import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { Props as ResourceFormProps, ResourceForm as Component } from '../presentations/components/ResourceForm';
import { fetchResource } from '../usecases';
import { State } from '../reducers';

interface Props {
  resourceId: string | null;
}

const mapStateToProps = (state: State, props: Props) => {
  return {
    resourceId: props.resourceId,
    resource: state.resource,
    locale: state.ui.resourceLocale,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    onMount: (props: ResourceFormProps) => {
      if (props.resourceId) {
        dispatch(fetchResource(props.resourceId, { locale: 'all' }));
      }
    },
  };
};

export const ResourceForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

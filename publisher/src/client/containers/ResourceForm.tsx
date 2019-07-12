import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Props as ResourceFormProps, ResourceForm as Component } from '../presentations/components/ResourceForm';
import { setResource } from '../actions';
import { createResource, fetchResource, updateResource } from '../usecases';
import { State } from '../reducers';
import { loadConfig, createDefaultResource } from '../../utils';

const config = loadConfig();

interface Props {
  resourceId: string | null;
  history: RouteComponentProps['history'];
}

const mapStateToProps = (state: State, props: Props) => {
  return {
    resourceId: state.app.resource.id || props.resourceId,
    resource: state.app.resource,
    locale: state.ui.resourceLocale,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>, props: Props) => {
  return {
    onMount: (resourceFormProps: ResourceFormProps) => {
      if (resourceFormProps.resourceId) {
        dispatch(fetchResource(resourceFormProps.resourceId));
      } else {
        dispatch(setResource(createDefaultResource()));
      }
    },
    onUpdate: (resourceFormProps: ResourceFormProps) => {
      if (props.resourceId === null && resourceFormProps.resourceId) {
        props.history.replace(`/resources/${resourceFormProps.resourceId}`);
      }
    },
    onChange: (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>, props: ResourceFormProps) => {
      const name = event.currentTarget.name;
      const value = event.currentTarget.value;
      const currentResource = JSON.parse(JSON.stringify(props.resource));

      if (name === 'type') {
        currentResource.attributes = {};
        const resourceType = config.resourceTypes.filter((tmp: any) => tmp.type === value)[0];
        if (resourceType && resourceType.attributes) {
          for (let attr of resourceType.attributes) {
            switch (attr.inputType) {
              case 'select': {
                currentResource.attributes[attr.key] = (attr as any).options[0].value;
                break;
              }
              case 'number': {
                currentResource.attributes[attr.key] = 0;
                break;
              }
              case 'date': {
                const now = new Date();
                currentResource.attributes[attr.key] = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
                break;
              }
            }
          }
        }
      }

      function setValue(obj: any, key: string, val: any) {
        const keys = key.split('.');
        let tmp = obj;
        for (let i = 0; i < keys.length; i += 1) {
          const k = keys[i];
          if (typeof tmp[k] === 'object') {
            tmp = tmp[k];
          }
        }
        tmp[keys[keys.length - 1]] = val;
        return obj;
      }

      dispatch(setResource(setValue(currentResource, name, value)));
    },
    onSubmit(event: React.FormEvent<HTMLFormElement>, props: ResourceFormProps) {
      event.preventDefault();
      const resource = props.resource;
      const resourceId = resource ? resource.id : null;

      if (resource && resourceId) {
        dispatch(updateResource(resourceId, resource));
      } else if (resource) {
        dispatch(createResource(resource));
      }
    },
  };
};

export const ResourceForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

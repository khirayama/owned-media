import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Props as ResourceFormProps, ResourceForm as Component } from '../presentations/components/ResourceForm';
import { Props as RelationLabelProps } from '../presentations/components/RelationLabel';
import { setResource } from '../actions';
import {
  createResource,
  fetchResource,
  fetchResources,
  updateResource,
  createRelations,
  deleteRelations,
} from '../usecases';
import { State } from '../reducers';
import { createDefaultResource } from '../../utils';

interface Props {
  resourceId: string | null;
  history: RouteComponentProps['history'];
}

const mapStateToProps = (state: State, props: Props) => {
  return {
    resourceId: props.resourceId,
    resource: state.app.resource,
    resources: state.resources.data,
    locale: state.ui.resourceLocale,
    locales: state.config ? state.config.locales : [],
    resourceTypes: state.config ? state.config.resourceTypes : [],
    baseUrl: state.ui.baseUrl,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>, props: Props) => {
  return {
    onMount: (resourceFormProps: ResourceFormProps) => {
      dispatch(fetchResources());
      if (resourceFormProps.resourceId) {
        dispatch(fetchResource(resourceFormProps.resourceId));
      } else {
        dispatch(
          setResource(createDefaultResource(resourceFormProps.resourceTypes[0].type, resourceFormProps.locales)),
        );
      }
    },
    onChange: (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>, props: ResourceFormProps) => {
      const name = event.currentTarget.name;
      const value = event.currentTarget.value;
      const currentResource = JSON.parse(JSON.stringify(props.resource));

      if (name === 'type') {
        currentResource.attributes = {};
        // TODO
        const config: any = null;

        if (config) {
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
    onSubmit(event: React.FormEvent<HTMLFormElement>, resourceFormProps: ResourceFormProps) {
      event.preventDefault();
      const resource = resourceFormProps.resource;
      const resourceId = resource ? resource.id : null;

      if (resource && resourceId) {
        dispatch(updateResource(resourceId, resource));
      } else if (resource) {
        dispatch(createResource(resource)).then((action: any) => {
          props.history.replace(`${resourceFormProps.baseUrl}/resources/${action.payload.resource.id}`);
        });
      }
    },
    onClickRelationLabel(event: React.MouseEvent<HTMLButtonElement>, relationLabelProps: RelationLabelProps) {
      event.preventDefault();
      if (props.resourceId && relationLabelProps.resource.id !== props.resourceId) {
        if (relationLabelProps.selected) {
          dispatch(deleteRelations(props.resourceId, [relationLabelProps.resource.id]));
        } else {
          dispatch(createRelations(props.resourceId, [relationLabelProps.resource.id]));
        }
      }
    },
  };
};

export const ResourceForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

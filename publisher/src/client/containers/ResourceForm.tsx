import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { Props as ResourceFormProps, ResourceForm as Component } from '../presentations/components/ResourceForm';
import { Resource as ResourceService } from '../services/Resource';
import { setResource } from '../actions';
import { fetchResource } from '../usecases';
import { loadConfig } from '../../utils';
import { ResourceShape } from '../../types';
import { State } from '../reducers';
import {
  createDefaultResource,
  mergeDeep,
  resourceWithAllLocalesToResource,
  resourceToPartialResourceWithAllLocales,
} from '../../utils';

const config = loadConfig();

interface Props {
  resourceId: string | null;
}

const mapStateToProps = (state: State, props: Props) => {
  return {
    resourceId: props.resourceId,
    resource: state.app.resource,
    locale: state.ui.resourceLocale,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    onMount: (props: ResourceFormProps) => {
      if (props.resourceId) {
        dispatch(fetchResource(props.resourceId, { locale: 'all' }));
        ResourceService.fetchRelations(props.resourceId, { locale: 'all' });
      } else {
        dispatch(setResource(createDefaultResource()));
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
        Promise.all(
          config.locales.map((locale: string) => {
            return ResourceService.update(resourceId, resourceWithAllLocalesToResource(resource, locale), { locale });
          }),
        ).then(res => {
          for (let i = 0; i < config.locales.length; i += 1) {
            const locale = config.locales[i];
            const tmpResource: ResourceShape = res[i] as ResourceShape;
            setResource(mergeDeep({}, resource, resourceToPartialResourceWithAllLocales(tmpResource, locale)));
          }
        });
      } else if (resource) {
        const firstLocale = config.locales[0];
        const otherLocales = config.locales.slice(1, config.locales.length);
        ResourceService.create(resourceWithAllLocalesToResource(resource, firstLocale), { locale: firstLocale }).then(
          (newResource: ResourceShape) => {
            setResource(mergeDeep({}, resource, resourceToPartialResourceWithAllLocales(newResource, firstLocale)));
            Promise.all(
              otherLocales.map((locale: string) => {
                return ResourceService.update(newResource.id, resourceWithAllLocalesToResource(resource, locale), {
                  locale,
                });
              }),
            ).then(res => {
              for (let i = 0; i < otherLocales.length; i += 1) {
                const locale = otherLocales[i];
                const tmpResource: ResourceShape = res[i] as ResourceShape;
                setResource(mergeDeep({}, resource, resourceToPartialResourceWithAllLocales(tmpResource, locale)));
              }
            });
          },
        );
      }
    },
  };
};

export const ResourceForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

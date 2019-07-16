import { Action } from 'redux';

// eslint-disable-next-line node/no-missing-import, node/no-extraneous-import
import { ResourceShape } from 'publisher';

export interface SetResource extends Action<'SET_RESOURCE'> {
  payload: {
    resource: ResourceShape;
  };
}

export const setResource = (resource): SetResource => {
  return {
    type: 'SET_RESOURCE',
    payload: {
      resource,
    },
  };
};

export interface ChangeLocale extends Action<'CHANGE_LOCALE'> {
  payload: {
    locale: string;
  };
}

export const changeLocale = (locale: string): ChangeLocale => {
  return {
    type: 'CHANGE_LOCALE',
    payload: {
      locale,
    },
  };
};

import { Action } from 'redux';

export type Actions = ChangeLocale | SetPathname;

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

export interface SetPathname extends Action<'SET_PATHNAME'> {
  payload: {
    pathname: string;
  };
}

export const setPathname = (pathname: string): SetPathname => {
  return {
    type: 'SET_PATHNAME',
    payload: {
      pathname,
    },
  };
};

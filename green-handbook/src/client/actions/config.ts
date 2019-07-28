import { Action } from 'redux';

import { Config } from 'publisher';

export type Actions = SetConfig;

export interface SetConfig extends Action<'SET_CONFIG'> {
  payload: {
    config: Config | null;
  };
}

export const setConfig = (config: Config | null): SetConfig => {
  return {
    type: 'SET_CONFIG',
    payload: {
      config,
    },
  };
};

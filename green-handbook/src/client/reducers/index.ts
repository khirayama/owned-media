import { combineReducers } from 'redux';

import { Config } from 'publisher';

import { reducer as configReducer } from './config';
import { reducer as resourcesReducer, State as ResourcesState } from './resources';
import { reducer as UIReducer, State as UIState } from './ui';

export interface State {
  config: Config | null;
  resources: ResourcesState;
  ui: UIState;
}

export const reducer = combineReducers({
  config: configReducer,
  resources: resourcesReducer,
  ui: UIReducer,
});

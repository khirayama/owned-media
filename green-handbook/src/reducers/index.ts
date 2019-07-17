import { combineReducers } from 'redux';
import { reducer as resourcesReducer, State as ResourcesState } from './resources';
import { reducer as UIReducer, State as UIState } from './ui';

export interface State {
  resources: ResourcesState;
  ui: UIState;
}

export const reducer = combineReducers({
  resources: resourcesReducer,
  ui: UIReducer,
});

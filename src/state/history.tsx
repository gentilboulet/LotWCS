import { IAction } from 'state/actions/types';
import { IStoreState } from 'state/types';
import { globalReducer } from './global';

export function pushToHistory(state: IStoreState, action: IAction): IStoreState {
  return state.updateIn(['history'], (list) => list.push(action) );
}

export function replayHistory(state: IStoreState, actions: IAction[]): IStoreState {
  for (const action of actions) { state = globalReducer(state, action); }
  return state;
}

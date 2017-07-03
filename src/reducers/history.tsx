import { IAction } from '../types/actions';
import { IStoreState } from '../types/state';
import { globalReducer } from './global';

export function pushToHistory(state: IStoreState, action: IAction): IStoreState {
  const history = Array.from(state.get('history'));
  history.push(action);
  return state.set('history', history);
}

export function replayHistory(state: IStoreState, actions: IAction[]): IStoreState {
  for (let a of actions) { state = globalReducer(state, a); }
  return state;
}

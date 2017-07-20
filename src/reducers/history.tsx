import { IAction } from '../types/actions';
import { IStoreState } from '../types/state';
import { IHistoryAction } from '../actions/history';
import * as constants from '../constants/history';
import { globalReducer } from './global';

export function pushToHistory(state: IStoreState, action: IAction): IStoreState {
  return state.updateIn(['history'], (list) => { return list.push(action); });
}

export function replayHistory(state: IStoreState, actions: IAction[]): IStoreState {
  for (let a of actions) { state = globalReducer(state, a); }
  return state;
}

export function historyReducer(oldState: IStoreState, action: IHistoryAction): IStoreState {
  switch (action.type) {
    case constants.HISTORY_DELETE:
      const list: IAction[] = oldState.get('history').toJS();
      return replayHistory(oldState, list.slice(0, action.id));
    default:
      return oldState;
  }
}

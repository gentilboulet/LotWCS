import { IHistoryAction } from '../actions/history';
import * as constants from '../constants/history';
import { IAction } from '../actions/types';
import { IStoreState } from '../state/types';
import { globalReducer } from './global';

export function pushToHistory(state: IStoreState, action: IAction): IStoreState {
  return state.updateIn(['history'], (list) => list.push(action) );
}

export function replayHistory(state: IStoreState, actions: IAction[]): IStoreState {
  for (const action of actions) { state = globalReducer(state, action); }
  return state;
}

export function historyReducer(oldState: IStoreState, action: IHistoryAction): IStoreState {
  switch (action.type) {
    case constants.HISTORY_DELETE:
      const list: IAction[] = oldState.get('history').toJS();
      return replayHistory(oldState, list.slice(0, action.id + 1)); // +1 needed to skip initialState
    default:
      return oldState;
  }
}

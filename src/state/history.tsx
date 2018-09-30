import { resetToInitialState } from 'state/actions/initial';
import { IAction } from 'state/actions/types';
import { globalReducer } from 'state/reducers/global';
import { IStoreState } from 'state/type';

export type THistoryState = IAction[];

export function replayHistory(state: IStoreState, actions: IAction[]): IStoreState {
  for (const action of actions) { state = globalReducer(state, action); }
  return state;
}

export function createState(): THistoryState { return [resetToInitialState()]; }

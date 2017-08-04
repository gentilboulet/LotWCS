import { IVirtueAction } from '../actions/virtues';
import * as constants from '../constants/virtues';
import * as dataVirtue from '../data/virtues';
import { IStoreState, IStoreVirtue, virtueFactory } from '../types/state';

import { pushToHistory } from './history';

export function getVirtueIndex(state: IStoreState, virtue: string): number {
  return state.get('virtues').findIndex((v: IStoreVirtue) => (v.name === virtue));
}

export function addVirtue(state: IStoreState, name: string, type: dataVirtue.IDataVirtueType): void {
  state.updateIn(['virtues'], list => list.push(
      virtueFactory(name, type)
    )
  );
}
export function increaseVirtue(
  state: IStoreState, name: string, increase: number): void {
  const index = getVirtueIndex(state, name);
  state.updateIn(['virtues', index, 'value'], v => (v + increase));
}

export function virtuesReducer(oldState: IStoreState, action: IVirtueAction): IStoreState {
  switch (action.type) {
    case constants.VIRTUE_INCREASE:
      return oldState.withMutations(state => {
        if (getVirtueIndex(state, name) === -1) {
          addVirtue(state, action.name, action.virtueType);
        }
        increaseVirtue(state, action.name, action.value);
        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

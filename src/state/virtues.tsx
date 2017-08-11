import * as dataVirtue from 'data/virtues';
import { IStoreState, IStoreVirtue, virtueFactory } from 'state/types';

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

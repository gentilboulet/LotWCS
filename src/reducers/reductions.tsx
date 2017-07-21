import * as Immutable from 'immutable';
import { IReduction, isReduction } from '../types/reductions';
import { ICost } from '../types/costs';
import { IStoreState } from '../types/state';

export function pushToReductions(oldState: IStoreState, reductions: IReduction[]): IStoreState {
  return oldState.withMutations((state: IStoreState) => {
    reductions
      .filter((r: IReduction) => { return isReduction(r); })
      .forEach((r: IReduction) => {
          state.updateIn(['reductions'], (list) => { return list.push(r); });
      });
  });
}

export function updateReductions(oldState: IStoreState, cost: ICost) {
  if (cost.reductionIdx < 0) { return oldState; }
  return oldState.withMutations((state: IStoreState) => {
    if (cost.reductionNewValue === 0) {
      // Remove the reduction
      state.updateIn(['reductions'], (list: Immutable.List<IReduction>) => {
        return list.delete(cost.reductionIdx);
      });
    } else {
      // Update the reduction
      state.updateIn(['reductions', cost.reductionIdx], (r: IReduction) => {
        r.value = cost.reductionNewValue;
        return r;
      });
    }
  });
}

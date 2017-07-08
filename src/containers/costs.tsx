import { IStoreState } from '../types/state';
import { IReduction } from '../types/reductions';
import { ICost } from '../types/costs';
import * as constants from '../constants/reductions';

export function getCostSkill(state: IStoreState, skill: string): ICost {
  const defCost = 2;

  const idx = state.get('reductions')
    .findIndex((r: IReduction) => {
      return ( r.type === constants.REDUCTION_SKILL )
      && (r.skills.findIndex((s: string) => { return s === skill; }) >= 0);
    });

  if (idx < 0) {
    return { destiny: defCost, entanglement: 0, reductionIdx: idx, reductionNewValue: 0};
  } else {
    const reduction = state.getIn(['reductions', idx]).value;
    const remainingCost = Math.max(0, defCost - reduction);
    const usedReductionValue = defCost - remainingCost;
    return {
      destiny: remainingCost,
      entanglement: 0,
      reductionIdx: idx,
      reductionNewValue: reduction - usedReductionValue
    };
  }
}

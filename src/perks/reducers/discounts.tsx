/*
import { produce } from 'immer';

import { ICost } from 'costs/types';
import { IDiscount, isDiscount } from 'perks/types/discounts';
import { IStoreState } from 'state/type';

export function pushToDiscounts(baseState: IStoreState, discounts: IDiscount[]): IStoreState {
  return baseState.withMutations((state: IStoreState) => {
    discounts
      .filter((r: IDiscount) => isDiscount(r) )
      .forEach((r: IDiscount) => { state.updateIn(['discounts'], (list) => list.push(r) ); });
  });
}

export function updateDiscounts(baseState: IStoreState, cost: ICost) {
  if (cost.discountIdx < 0) { return baseState; }
  return baseState.withMutations((state: IStoreState) => {
    if (cost.discountNewValue === 0) {
      // Remove the discount
      state.updateIn(['discounts'], (list: Immutable.List<IDiscount>) => list.delete(cost.discountIdx));
    } else {
      // Update the discount
      state.updateIn(['discounts', cost.discountIdx], (r: IDiscount) => {
        r.value = cost.discountNewValue;
        return r;
      });
    }
  });
}
*/

export {};

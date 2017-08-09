import * as Immutable from 'immutable';

import { ICost } from '../../costs/types';
import { IDiscount, isDiscount } from '../types/discounts';
import { IStoreState } from '../../state/types';

export function pushToDiscounts(oldState: IStoreState, discounts: IDiscount[]): IStoreState {
  return oldState.withMutations((state: IStoreState) => {
    discounts
      .filter((r: IDiscount) => isDiscount(r) )
      .forEach((r: IDiscount) => { state.updateIn(['discounts'], (list) => list.push(r) ); });
  });
}

export function updateDiscounts(oldState: IStoreState, cost: ICost) {
  if (cost.discountIdx < 0) { return oldState; }
  return oldState.withMutations((state: IStoreState) => {
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

import { ICost } from "./costs";
import { IStoreState } from "./type";

import { IDiscount, isDiscount } from "../perks/discounts";

export type TDiscountsState = IDiscount[];

export function createState(): TDiscountsState {
  return [];
}

export function pushToDiscounts(
  state: IStoreState,
  discounts: IDiscount[]
): void {
  discounts
    .filter((r: IDiscount) => isDiscount(r))
    .forEach((r: IDiscount) => {
      state.discounts.push(r);
    });
}

export function getDiscountIndexes(
  state: IStoreState,
  predicate: (d: IDiscount) => boolean
) {
  const discountIdx = state.discounts
    .map((discount: IDiscount, idx: number) => {
      if (predicate(discount)) {
        return idx;
      }
      return NaN;
    })
    .filter((value: number) => !isNaN(value));
  if (discountIdx) {
    return discountIdx;
  } else {
    return [];
  }
}

export function updateDiscounts(state: IStoreState, cost: ICost): void {
  // Update the discount
  if (!cost.discounts) {
    return;
  }

  cost.discounts.forEach(costDiscount => {
    state.discounts[costDiscount.idx].value = costDiscount.newValue;

    if (costDiscount.newValue === 0) {
      // Remove the empty discount
      state.discounts.splice(costDiscount.idx, 1);
    }
  });
}

import { ICost } from "./costs";
import { IStoreState } from "./type";

import { TChiName } from "../data/chi";
import { TSkillName } from "../data/skills";
import * as constants from "./constants/perks/discounts";

export interface IDiscountSkill {
  type: constants.DISCOUNT_SKILL;
  skills: TSkillName[];
  value: number;
}

export interface IDiscountChi {
  type: constants.DISCOUNT_CHI;
  chis: TChiName[];
  value: number;
}

export interface IDiscountLoresheet {
  type: constants.DISCOUNT_LORESHEET;
  uids: string[];
  value: number;
}

export interface IDiscountLoresheetOption {
  type: constants.DISCOUNT_LORESHEET_OPTION;
  uids: Array<{ lsUid: string; optUid: string[] }>;
  value: number;
}

export type IDiscount =
  | IDiscountSkill
  | IDiscountChi
  | IDiscountLoresheet
  | IDiscountLoresheetOption;

export function isDiscount(r: any): boolean {
  switch (r.type) {
    case constants.DISCOUNT_CHI:
    case constants.DISCOUNT_SKILL:
    case constants.DISCOUNT_LORESHEET:
    case constants.DISCOUNT_LORESHEET_OPTION:
      return true;
    default:
      return false;
  }
}

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

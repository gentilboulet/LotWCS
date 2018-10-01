import { ICost } from 'state/costs';
import { IStoreState } from 'state/type';

import { TChiName } from 'data/chi';
import { TSkillName } from 'data/skills';
import * as constants from 'state/constants/perks/discounts';

export interface IDiscountSkill {
  type: constants.DISCOUNT_SKILL;
  skills: TSkillName[] ;
  value: number;
}

export interface IDiscountChi {
  type: constants.DISCOUNT_CHI;
  chis: TChiName[] ;
  value: number;
}

export interface IDiscountLoresheet {
  type: constants.DISCOUNT_LORESHEET;
  uids: string[];
  value: number;
}

export interface IDiscountLoresheetOption {
  type: constants.DISCOUNT_LORESHEET_OPTION;
  uids: Array<{ lsUid: string , optUid: string[]; }>;
  value: number;
}

export type IDiscount =
  IDiscountSkill
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

export function createState(): TDiscountsState { return []; }


export function pushToDiscounts(state: IStoreState, discounts: IDiscount[]): void {
  discounts
      .filter((r: IDiscount) => isDiscount(r) )
      .forEach((r: IDiscount) => { state.discounts.push(r) });
}

export function updateDiscounts(state: IStoreState, cost: ICost): void {
  if( cost.discountNewValue !== undefined && cost.discountNewValue !== 0 && cost.discountIdx !== undefined) {
    // Update the discount
    state.discounts[cost.discountIdx].value = cost.discountNewValue;
  }

  if( cost.discountNewValue === 0 && cost.discountIdx !== undefined) {
    // Remove the empty discount
    state.discounts = state.discounts.filter((element, index) => cost.discountIdx !== index);
  }
}

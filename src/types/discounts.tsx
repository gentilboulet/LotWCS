import * as constants from '../constants/discounts';

export interface IDiscountSkill {
  type: constants.DISCOUNT_SKILL;
  skills: string[];
  value: number;
}

export interface IDiscountLoresheet {
  type: constants.DISCOUNT_LORESHEET;
  uids: string[];
  value: number;
}

export interface IDiscountLoresheetOption {
  type: constants.DISCOUNT_LORESHEET_OPTION;
  uids: { lsUid: string , optUid: string[]; }[];
  value: number;
}

export type IDiscount =
  IDiscountSkill
  | IDiscountLoresheet
  | IDiscountLoresheetOption;

/* tslint:disable:no-any */
export function isDiscount(r: any): boolean {
  switch (r.type) {
    case constants.DISCOUNT_SKILL:
    case constants.DISCOUNT_LORESHEET:
    case constants.DISCOUNT_LORESHEET_OPTION:
      return true;
    default:
      return false;
  }
}

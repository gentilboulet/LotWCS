import { TChiName } from "../data/chi";
import { KUNGFU_TYPE } from "../data/kungfu/types";
import { TSkillName } from "../data/skills";
import * as constants from "./constants/discounts";

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

export interface IDiscountKungfu {
  type: constants.DISCOUNT_KUNGFU_STYLE;
  uids: string[];
  kfType: KUNGFU_TYPE[];
  value: number;
}

export interface IDiscountKungfuTechnique {
  type: constants.DISCOUNT_KUNGFU_TECHNIQUE;
  uids: Array<{ styleUid: string }>;
  kfType: KUNGFU_TYPE[];
  value: number;
}

export type IDiscount =
  | IDiscountSkill
  | IDiscountChi
  | IDiscountLoresheet
  | IDiscountLoresheetOption
  | IDiscountKungfu
  | IDiscountKungfuTechnique;

export function isDiscount(r: any): boolean {
  switch (r.type) {
    case constants.DISCOUNT_CHI:
    case constants.DISCOUNT_SKILL:
    case constants.DISCOUNT_LORESHEET:
    case constants.DISCOUNT_LORESHEET_OPTION:
    case constants.DISCOUNT_KUNGFU_STYLE:
    case constants.DISCOUNT_KUNGFU_TECHNIQUE:
      return true;
    default:
      return false;
  }
}

export type TDiscountsState = IDiscount[];

export function createState(): TDiscountsState {
  return [];
}

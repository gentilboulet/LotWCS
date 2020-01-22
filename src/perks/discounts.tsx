import { TChiName } from "../data/chi";
import { KUNGFU_TYPE } from "../data/kungfu/types";
import { TSkillName } from "../data/skills";
import { IDataVirtueType } from "../data/virtues";
import * as constants from "./constants/discounts";

interface IGenericDiscount {
  type: string;
  value: number;
}

export interface IDiscountSkill extends IGenericDiscount {
  type: constants.DISCOUNT_SKILL;
  skills: TSkillName[];
}

export interface IDiscountChi extends IGenericDiscount {
  type: constants.DISCOUNT_CHI;
  chis: TChiName[];
}

export interface IDiscountLoresheet extends IGenericDiscount {
  type: constants.DISCOUNT_LORESHEET;
  uids: string[];
}

export interface IDiscountLoresheetOption extends IGenericDiscount {
  type: constants.DISCOUNT_LORESHEET_OPTION;
  uids: Array<{ lsUid: string; optUid: string[] }>;
}

export interface IDiscountKungfu extends IGenericDiscount {
  type: constants.DISCOUNT_KUNGFU_STYLE;
  kfType: KUNGFU_TYPE;
  uids: string[];
}

export interface IDiscountKungfuTechnique extends IGenericDiscount {
  type: constants.DISCOUNT_KUNGFU_TECHNIQUE;
  uids: Array<{ styleUid: string }>;
  kfType: KUNGFU_TYPE[];
}

export interface IDiscountVirtue extends IGenericDiscount {
  type: constants.DISCOUNT_VIRTUE;
  virtues: Array<{ name: string; type: IDataVirtueType }>;
}

export type IDiscount =
  | IDiscountSkill
  | IDiscountChi
  | IDiscountLoresheet
  | IDiscountLoresheetOption
  | IDiscountKungfu
  | IDiscountKungfuTechnique
  | IDiscountVirtue;

export function isDiscount(r: any): boolean {
  switch (r.type) {
    case constants.DISCOUNT_CHI:
    case constants.DISCOUNT_SKILL:
    case constants.DISCOUNT_LORESHEET:
    case constants.DISCOUNT_LORESHEET_OPTION:
    case constants.DISCOUNT_KUNGFU_STYLE:
    case constants.DISCOUNT_KUNGFU_TECHNIQUE:
    case constants.DISCOUNT_VIRTUE:
      return true;
    default:
      return false;
  }
}

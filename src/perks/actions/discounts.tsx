import * as constants from "../constants/discounts";
import { IDiscountKungfu, IDiscountSkill, IDiscountVirtue } from "../discounts";

import { KUNGFU_TYPE } from "../../data/kungfu/types";
import { skills, TSkillName } from "../../data/skills";
import { IDataVirtueType } from "../../data/virtues";

export function discountSkillFactory(
  value: number,
  subset?: TSkillName[],
): IDiscountSkill {
  if (subset && subset.length > 0) {
    return { skills: subset, type: constants.DISCOUNT_SKILL, value };
  } else {
    return {
      skills: Object.keys(skills) as TSkillName[],
      type: constants.DISCOUNT_SKILL,
      value,
    };
  }
}

export function discountKungfuFactory(
  value: number,
  kfType: KUNGFU_TYPE,
  uids?: string[],
): IDiscountKungfu {
  if (uids && uids.length > 0) {
    return { type: constants.DISCOUNT_KUNGFU_STYLE, kfType, uids, value };
  } else {
    return { type: constants.DISCOUNT_KUNGFU_STYLE, kfType, uids: [], value };
  }
}

export function discountVirtueFactory(
  value: number,
  virtues: Array<{ name: string; type: IDataVirtueType }>,
): IDiscountVirtue {
  return { type: constants.DISCOUNT_VIRTUE, virtues, value };
}

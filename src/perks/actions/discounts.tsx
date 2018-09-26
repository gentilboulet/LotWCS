import * as constants from 'perks/constants/discounts';
import { IDiscountSkill } from 'perks/types/discounts';

import { skills, TSkillName } from 'data/skills';

export function discountSkillFactory(value: number, subset?: TSkillName[]): IDiscountSkill {
  if (subset && subset.length > 0) {
    return { skills: subset, type: constants.DISCOUNT_SKILL, value, };
  } else {
    return {
      skills: Object.keys(skills) as TSkillName[],
      type: constants.DISCOUNT_SKILL,
      value,
    };
  }
}

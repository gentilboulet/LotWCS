import * as constants from 'state/constants/perks/discounts';
import { IDiscountSkill } from 'state/discounts';

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

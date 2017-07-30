import * as constants from '../constants/discounts';
import { skills } from '../data/skills';
import { IDiscountSkill } from '../types/discounts';
import { IDataSkill } from '../types/skills';

export function discountSkillFactory(value: number, subset?: string[]): IDiscountSkill {
  if (subset) {
    return { skills: subset, type: constants.DISCOUNT_SKILL, value, };
  } else {
    return {
      skills: skills.map((s: IDataSkill) => s.name),
      type: constants.DISCOUNT_SKILL,
      value,
    };
  }
}

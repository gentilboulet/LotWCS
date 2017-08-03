import * as constants from '../constants/discounts';
import * as dataSkills from '../data/skills';
import { IDiscountSkill } from '../types/discounts';

export function discountSkillFactory(value: number, subset?: string[]): IDiscountSkill {
  if (subset && subset.length > 0) {
    subset.map((skill: string) => dataSkills.validateSkill(skill));
    return { skills: subset, type: constants.DISCOUNT_SKILL, value, };
  } else {
    return {
      skills: dataSkills.skills.map((s: dataSkills.IDataSkill) => s.name),
      type: constants.DISCOUNT_SKILL,
      value,
    };
  }
}

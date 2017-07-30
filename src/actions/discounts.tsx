import * as constants from '../constants/discounts';
import { IDiscountSkill } from '../types/discounts';
import { IDataSkill } from '../types/skills';
import { skills } from '../data/skills';

export function skill(v: number, subset?: string[]): IDiscountSkill {
  if (subset) {
    return { type: constants.DISCOUNT_SKILL, value: v, skills: subset};
  } else {
    return {
      type: constants.DISCOUNT_SKILL,
      value: v, 
      skills: skills.map((s: IDataSkill) => { return s.name; })
    };
  }
}

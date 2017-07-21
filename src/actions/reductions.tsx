import * as constants from '../constants/reductions';
import { IReductionSkill } from '../types/reductions';
import { IDataSkill } from '../types/skills';
import { skills } from '../data/skills';

export function skill(v: number, subset?: string[]): IReductionSkill {
  if (subset) {
    return { type: constants.REDUCTION_SKILL, value: v, skills: subset};
  } else {
    return {
      type: constants.REDUCTION_SKILL,
      value: v, 
      skills: skills.map((s: IDataSkill) => { return s.name; })
    };
  }
}

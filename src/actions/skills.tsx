import * as constants from '../constants/skills';
import * as dataSkills from '../data/skills';

import { ICost } from '../types/costs';

export interface ISkillBuy {
  type: constants.SKILLS_BUY;
  name: string;
  cost: ICost;
}

export interface ISkillSpecialityBuy {
  type: constants.SKILLS_SPECIALITY_BUY;
  skill: string;
  speciality: string;
  cost: ICost;
}

export type ISkillAction = ISkillBuy | ISkillSpecialityBuy;

export function skillsBuy(name: string, cost: ICost): ISkillBuy {
  dataSkills.validateSkill(name);
  return { cost, name, type: constants.SKILLS_BUY };
}

export function skillSpecialityBuy(skill: string, speciality: string, cost: ICost): ISkillSpecialityBuy {
  dataSkills.validateSkill(skill);
  if (speciality.length === 0) { throw new Error ('Empty speciality'); }
  return { cost, skill, speciality, type: constants.SKILLS_SPECIALITY_BUY };
}

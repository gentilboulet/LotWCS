import * as constants from '../constants/skills';
import { skills } from '../data/skills';

import { ICost } from '../types/costs';
import { IDataSkill } from '../types/skills';

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
  const foundSkill = skills.find((skill: IDataSkill) => (skill.name === name) );
  if (! foundSkill ) { throw new Error('Unknown skill "' + name + '"'); }
  return { cost, name, type: constants.SKILLS_BUY, };
}

export function skillSpecialityBuy(skill: string, speciality: string, cost: ICost): ISkillSpecialityBuy {
  return { cost, skill, speciality, type: constants.SKILLS_SPECIALITY_BUY };
}

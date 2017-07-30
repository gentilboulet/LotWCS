import * as constants from '../constants/skills';
import { ICost } from '../types/costs';
import { skills } from '../data/skills';
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

export type ISkillAction = ISkillBuy | ISkillSpecialityBuy
;

export function skillsBuy(s: string, c: ICost): ISkillBuy {
  const foundSkill = skills.find((skill: IDataSkill) => { return skill.name === s; });
  if (! foundSkill ) { throw 'Unknown skill "' + s + '"'; }
  return {
    type: constants.SKILLS_BUY,
    name: s,
    cost: c,
  };
}

export function skillSpecialityBuy(skill: string, speciality: string, c: ICost): ISkillSpecialityBuy {
  return {
    type: constants.SKILLS_SPECIALITY_BUY,
    skill: skill,
    speciality: speciality,
    cost: c,
  };
}

import { ICost } from 'costs/types';
import { TSkillName } from 'data/skills';
import * as constants from 'state/constants/skills';


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

export function skillsBuy(name: TSkillName, cost: ICost): ISkillBuy {
  return { cost, name, type: constants.SKILLS_BUY };
}

export function skillSpecialityBuy(skill: TSkillName, speciality: string, cost: ICost): ISkillSpecialityBuy {
  if (speciality.length === 0) { throw new Error ('Empty speciality'); }
  return { cost, skill, speciality, type: constants.SKILLS_SPECIALITY_BUY };
}

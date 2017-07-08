import * as constants from '../constants/skills';
import { ICost } from '../types/costs';

export interface ISkillsDoStuff {
  type: constants.SKILLS_DO_STUFF;
  name: string;
}

export interface ISkillBuy {
  type: constants.SKILLS_BUY;
  name: string;
  cost: ICost;
}

export type ISkillAction =
  ISkillsDoStuff
  | ISkillBuy
;

export function skillsDoStuff(s: string): ISkillsDoStuff {
  return {
    type: constants.SKILLS_DO_STUFF,
    name: s
  };
}

export function skillsBuy(s: string, c: ICost): ISkillBuy {
  return {
    type: constants.SKILLS_BUY,
    name: s,
    cost: c,
  };
}

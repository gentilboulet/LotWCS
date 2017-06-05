import * as constants from '../constants/skills';

export interface ISkillsDoStuff {
  type: constants.SKILLS_DO_STUFF;
  name: string;
}

export type ISkillAction = ISkillsDoStuff;

export function skillsDoStuff(s: string): ISkillsDoStuff {
  return {
    type: constants.SKILLS_DO_STUFF,
    name: s
  };
}

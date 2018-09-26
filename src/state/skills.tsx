import { skills as data, TSkillName } from 'data/skills';

interface ISkill {
  name: string;
  specialities: string[];
  value: 0;
}

export type TSkillsState = {
  [skill in TSkillName]: ISkill;
}

export function createState(): TSkillsState {
  const state = {};
  Object.keys(data).forEach(skill => {
    state[skill] = {
      name: skill,
      specialities: [],
      value: 0
    };
  });
  return state as TSkillsState;
}

export function increase(state: TSkillsState, skillName: string, maxSkillBonus: number): void {
  const old = state[skillName].value;
  if( old + 5 > maxSkillBonus) {
    throw new Error('Skill overflow');
  }
  state[skillName].value += 5;
}

export function isSpecialityPresent(state: TSkillsState, skillName: string, specialityName: string): boolean {
  const specialityIndex = state[skillName].specialities.findIndex((speciality: string) => speciality === specialityName);
  return specialityIndex !== -1;
}

export function addSpeciality(state: TSkillsState, skillName: string, specialityName: string): void {
  if(isSpecialityPresent(state, skillName, specialityName) ) {
    throw new Error('Something went wrong, speciality "'+specialityName+'" for skill "'+skillName+'" already bought');
  }
  state[skillName].specialities.push(specialityName);
}

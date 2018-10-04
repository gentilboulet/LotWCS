import { skills as data, TSkillName } from 'data/skills';

import { canPayCost, getCostSkill, getCostSpeciality } from 'state/costs';
import { maxSkillBonus } from 'state/derived';
import { IStoreState } from 'state/type';

interface ISkill {
  name: string;
  specialities: string[];
  value: number;
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

export function increase(state: TSkillsState, skillName: string, maxSkillValue: number): void {
  const old = state[skillName].value;
  if( old + 5 > maxSkillValue) { throw new Error('Skill '+skillName+' overflow'); }
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

export function canBuySkill(state: IStoreState, skillName: TSkillName): boolean {
  const value = state.skills[skillName].value;
  const max = maxSkillBonus(state);
  if ( (value + 5) > max ) { return false; }
  const cost = getCostSkill(state, skillName);
  return canPayCost(state, cost);
}

export function canBuySpeciality(state: IStoreState, skillName: TSkillName, speciality: string): boolean {
  if ( isSpecialityPresent(state.skills, skillName, speciality) ) { return false; }
  const cost = getCostSpeciality(state, skillName, speciality);
  return canPayCost(state, cost);
}

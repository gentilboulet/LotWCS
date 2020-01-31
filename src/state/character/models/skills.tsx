import { skills as data, TSkillName } from "../../../data/skills";
import { maxSkillBonus } from "./derived";
import { ICharacterState } from "./type";

interface ISkill {
  name: TSkillName;
  specialities: string[];
  value: number;
}

export type TSkillsState = ISkill[];

export function createState(): TSkillsState {
  return Object.keys(data).map((name: TSkillName) => {
    return { name, specialities: [], value: 0 };
  });
}

export function increase(state: TSkillsState, skillName: TSkillName): void {
  getSkill(state, skillName).value += 5;
}

export function isSpecialityPresent(
  state: TSkillsState,
  skillName: TSkillName,
  specialityName: string,
): boolean {
  const specialityIndex = (state.find(
    s => s.name === skillName,
  ) as ISkill).specialities.findIndex(
    (speciality: string) => speciality === specialityName,
  );
  return specialityIndex !== -1;
}

export function addSpeciality(
  state: TSkillsState,
  skillName: TSkillName,
  specialityName: string,
): void {
  if (isSpecialityPresent(state, skillName, specialityName)) {
    throw new Error(
      'Something went wrong, speciality "' +
        specialityName +
        '" for skill "' +
        skillName +
        '" already bought',
    );
  }
  // getSkill(state, skillName).specialities.push(specialityName);
  const spe = getSkill(state, skillName);
  spe.specialities.push(specialityName);
  if (typeof specialityName != "string")
    throw new Error("Only stringm not" + specialityName);
}

export function canBuySkill(
  state: ICharacterState,
  skillName: TSkillName,
): boolean {
  const value = getSkill(state.skills, skillName).value;
  const max = maxSkillBonus(state);
  return !(value + 5 > max);
}

export function canBuySpeciality(
  state: ICharacterState,
  skillName: TSkillName,
  speciality: string,
): boolean {
  return !isSpecialityPresent(state.skills, skillName, speciality);
}

export function getSkill(state: TSkillsState, skillName: TSkillName) {
  console.log("searching for", skillName);
  return state.find(s => s.name === skillName) as ISkill;
}

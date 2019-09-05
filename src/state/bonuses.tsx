import produce from "immer";

import { IBonus, isBonus } from "../perks/bonuses";

import * as chi from "./chi";
import { maxSkillBonus } from "./derived";
import * as skills from "./skills";

import { IStoreState } from "./type";

import * as constants from "../perks/constants/bonuses";

export type TBonusesState = IBonus[];

export function createState(): TBonusesState {
  return [];
}

export function applyBonuses(
  baseState: IStoreState,
  bonuses: IBonus[]
): IStoreState {
  const nextState = produce(baseState, draftState => {
    bonuses
      .filter((bonus: IBonus) => isBonus(bonus))
      .forEach((bonus: IBonus) => {
        switch (bonus.type) {
          case constants.BONUS_DESTINY:
            draftState.destiny += bonus.value;
            break;
          case constants.BONUS_ENTANGLEMENT:
            draftState.entanglement += bonus.value;
            break;
          case constants.BONUS_CHI:
            chi.increase(draftState.chi, bonus.chi, bonus.value);
            break;
          case constants.BONUS_CULTIVATION:
            chi.increaseCultivation(draftState.chi, bonus.chi, bonus.value);
            break;
          case constants.BONUS_SKILL_RANK:
            const max = maxSkillBonus(draftState);
            // TODO : overflows
            skills.increase(draftState.skills, bonus.skill, max);
            break;
          case constants.BONUS_SPECIALITY:
            // TODO : already speciality
            skills.addSpeciality(
              draftState.skills,
              bonus.skill,
              bonus.speciality
            );
            break;
          default:
            return;
        }
      });
  });
  return nextState;
}

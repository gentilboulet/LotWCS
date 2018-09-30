import produce from "immer"

import * as chi from 'state/chi';
import { maxSkillBonus } from 'state/derived';
import * as skills from 'state/skills';

import { IStoreState } from 'state/type';

import { TChiName } from 'data/chi';
import * as constants from 'state/constants/perks/bonuses';

export interface IBonusDestiny {
  type: constants.BONUS_DESTINY;
  value: number;
}

export interface IBonusEntanglement {
  type: constants.BONUS_ENTANGLEMENT;
  value: number;
}

export interface IBonusChi {
  type: constants.BONUS_CHI;
  chi: TChiName;
  value: number;
}

export interface IBonusCultivation {
  type: constants.BONUS_CULTIVATION;
  chi: TChiName;
  value: number;
}

export interface IBonusOneAmongN {
  type: constants.BONUS_ONE_AMONG_N;
  bonuses: IBonus[];
}

export interface IBonusSkillRank {
  type: constants.BONUS_SKILL_RANK;
  skill: string;
}

export interface IBonusSpeciality {
  type: constants.BONUS_SPECIALITY;
  skill: string;
  speciality: string;
}

export type IBonus =
  IBonusDestiny
  | IBonusEntanglement
  | IBonusChi
  | IBonusCultivation
  | IBonusOneAmongN
  | IBonusSkillRank
  | IBonusSpeciality
;

export function isBonus(bonus: any): boolean {
  switch (bonus.type) {
    case constants.BONUS_DESTINY:
    case constants.BONUS_ENTANGLEMENT:
    case constants.BONUS_CHI:
    case constants.BONUS_CULTIVATION:
    case constants.BONUS_ONE_AMONG_N:
    case constants.BONUS_SKILL_RANK:
    case constants.BONUS_SPECIALITY:
      return true;
    case constants.BONUS_DISCOUNT:
    default:
      return false;
  }
}

export type TBonusesState = IBonus[];

export function createState(): TBonusesState { return []; }

export function applyBonuses(baseState: IStoreState, bonuses: IBonus[]): IStoreState {
  const nextState = produce(baseState, draftState => {
    bonuses.filter((bonus: IBonus) => isBonus(bonus))
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
        skills.increase(draftState.skills, bonus.skill, max ? max : 0);
        break;
        case constants.BONUS_SPECIALITY:
        skills.addSpeciality(draftState.skills, bonus.skill, bonus.speciality);
        break;
        default:
        return;
      }
    });
  });
  return nextState;
}

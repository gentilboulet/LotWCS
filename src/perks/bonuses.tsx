import { TChiName } from "../data/chi";
import { TSkillName } from "../data/skills";
import * as constants from "./constants/bonuses";

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
  bonuses: { [key in string]: IBonus };
}

// TODO : validity & auto resolution ?
export interface IBonusSkillRank {
  type: constants.BONUS_SKILL_RANK;
  skill: TSkillName;
}

export interface IBonusSpeciality {
  type: constants.BONUS_SPECIALITY;
  skill: TSkillName;
  speciality: string;
}

export interface IBonusLoresheet {
  type: constants.BONUS_LORESHEET;
  lsUid: string;
}

export interface IBonusLoresheetOption {
  type: constants.BONUS_LORESHEET_OPTION;
  lsUid: string;
  uid: string;
  payload?: string;
}

export type IBonus =
  | IBonusDestiny
  | IBonusEntanglement
  | IBonusChi
  | IBonusCultivation
  | IBonusOneAmongN
  | IBonusSkillRank
  | IBonusSpeciality
  | IBonusLoresheet
  | IBonusLoresheetOption;

export function isBonus(bonus: any): boolean {
  switch (bonus.type) {
    case constants.BONUS_DESTINY:
    case constants.BONUS_ENTANGLEMENT:
    case constants.BONUS_CHI:
    case constants.BONUS_CULTIVATION:
    case constants.BONUS_ONE_AMONG_N:
    case constants.BONUS_SKILL_RANK:
    case constants.BONUS_SPECIALITY:
    case constants.BONUS_LORESHEET:
    case constants.BONUS_LORESHEET_OPTION:
      return true;
    case constants.BONUS_DISCOUNT:
    default:
      return false;
  }
}

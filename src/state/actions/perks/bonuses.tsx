import {
  IBonus,
  IBonusChi,
  IBonusCultivation,
  IBonusDestiny,
  IBonusEntanglement,
  IBonusLoresheet,
  IBonusLoresheetOption,
  IBonusOneAmongN,
  IBonusSkillRank,
  IBonusSpeciality
} from "../../../perks/bonuses";
import * as constants from "../../../perks/constants/bonuses";

import * as dataChi from "../../../data/chi";
import * as dataSkill from "../../../data/skills";

export function bonusDestiny(value: number): IBonusDestiny {
  return { type: constants.BONUS_DESTINY, value };
}

export function bonusEntanglement(value: number): IBonusEntanglement {
  return { type: constants.BONUS_ENTANGLEMENT, value };
}

export function bonusChi(value: number, chiName: dataChi.TChiName): IBonusChi {
  return { type: constants.BONUS_CHI, chi: chiName, value };
}

export function bonusCultivation(
  chiName: dataChi.TChiName,
  value: number
): IBonusCultivation {
  return { type: constants.BONUS_CULTIVATION, value, chi: chiName };
}

export function bonusOneAmongN(
  bonuses: { [key in string]: IBonus }
): IBonusOneAmongN | IBonus {
  if (Object.keys(bonuses).length === 0) {
    throw new Error("Can not create one out of zero");
  }
  if (Object.keys(bonuses).length === 1) {
    return Object.values(bonuses)[0];
  }
  return { type: constants.BONUS_ONE_AMONG_N, bonuses };
}

export function bonusSkillRank(skill: dataSkill.TSkillName): IBonusSkillRank {
  return { type: constants.BONUS_SKILL_RANK, skill };
}

export function bonusSpeciality(
  skill: dataSkill.TSkillName,
  speciality: string
): IBonusSpeciality {
  return { skill, speciality, type: constants.BONUS_SPECIALITY };
}

export function bonusLoresheet(lsUid: string): IBonusLoresheet {
  return { type: constants.BONUS_LORESHEET, lsUid };
}

export function bonusLoresheetOption(
  lsUid: string,
  uid: string
): IBonusLoresheetOption {
  return { type: constants.BONUS_LORESHEET_OPTION, lsUid, uid };
}

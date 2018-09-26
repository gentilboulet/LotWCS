import * as constants from 'perks/constants/bonuses';
import { IBonus,
  IBonusChi, IBonusCultivation, IBonusDestiny, IBonusEntanglement, IBonusOneAmongN,
  IBonusSkillRank, IBonusSpeciality,
} from 'perks/types/bonuses';

import * as dataChi from 'data/chi';
import * as dataSkill from 'data/skills';

export function destiny(value: number): IBonusDestiny {
    return { type: constants.BONUS_DESTINY, value };
}

export function entanglement(value: number): IBonusEntanglement {
  return { type: constants.BONUS_ENTANGLEMENT, value };
}

export function chi(value: number, chiName: dataChi.TChiName): IBonusChi {
  return { type: constants.BONUS_CHI, chi: chiName, value};
}

export function cultivation(chiName: dataChi.TChiName, value: number): IBonusCultivation {
  return { type: constants.BONUS_CULTIVATION, value, chi: chiName};
}

export function oneAmongN(bonuses: IBonus[]): IBonusOneAmongN | IBonus {
  if (bonuses.length === 0) { throw new Error('Can not create one out of zero'); }
  if (bonuses.length === 1) { return bonuses[0]; }
  return { type: constants.BONUS_ONE_AMONG_N, bonuses };
}

export function skillRank(skill: dataSkill.TSkillName): IBonusSkillRank {
  return { type: constants.BONUS_SKILL_RANK, skill };
}

export function speciality(skill: dataSkill.TSkillName, specialityName: string): IBonusSpeciality {
  return { type: constants.BONUS_SPECIALITY, skill, speciality: specialityName };
}

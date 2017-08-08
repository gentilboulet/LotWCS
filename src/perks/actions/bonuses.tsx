import * as constants from '../constants/bonuses';
import { IBonus,
  IBonusDestiny, IBonusEntanglement, IBonusChi, IBonusCultivation, IBonusOneAmongN,
  IBonusSkillRank, IBonusSpeciality,
} from '../types/bonuses';
import * as dataChi from '../../data/chi';
import * as dataSkill from '../../data/skills';

export function destiny(value: number): IBonusDestiny {
    return { type: constants.BONUS_DESTINY, value };
}

export function entanglement(value: number): IBonusEntanglement {
  return { type: constants.BONUS_ENTANGLEMENT, value };
}

export function chi(value: number, chiName: dataChi.IChiNames): IBonusChi {
  dataChi.validateChi(chiName);
  return { type: constants.BONUS_CHI, chi: chiName, value};
}

export function cultivation(value: number, cultivationName: dataChi.IChiCultivations): IBonusCultivation {
  dataChi.validateCultivation(cultivationName);
  return { type: constants.BONUS_CULTIVATION, value, cultivation: cultivationName};
}

export function oneAmongN(bonuses: IBonus[]): IBonusOneAmongN | IBonus {
  if (bonuses.length === 0) { throw new Error('Can not create one out of zero'); }
  if (bonuses.length === 1) { return bonuses[0]; }
  return { type: constants.BONUS_ONE_AMONG_N, bonuses };
}

export function skillRank(skill: string): IBonusSkillRank {
  dataSkill.validateSkill(skill);
  return { type: constants.BONUS_SKILL_RANK, skill };
}

export function speciality(skill: string, specialityName: string): IBonusSpeciality {
  dataSkill.validateSkill(skill);
  return { type: constants.BONUS_SPECIALITY, skill, speciality: specialityName };
}

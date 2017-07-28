import * as constants from '../constants/bonuses';
import { IBonus,
  IBonusDestiny, IBonusEntanglement, IBonusChi, IBonusCultivation, IBonusOneAmongN,
  IBonusSkillRank, IBonusSpeciality,
} from '../types/bonuses';
import { IChiNames, IChiCultivations } from '../types/state';

export function destiny(value: number): IBonusDestiny {
    return { type: constants.BONUS_DESTINY, value };
}

export function entanglement(value: number): IBonusEntanglement {
  return { type: constants.BONUS_ENTANGLEMENT, value };
}

export function chi(value: number, chiName: IChiNames): IBonusChi {
  return { type: constants.BONUS_CHI, chi: chiName, value};
}

export function cultivation(value: number, cultivationName: IChiCultivations): IBonusCultivation {
  return { type: constants.BONUS_CULTIVATION, value, cultivation: cultivationName };
}

export function oneAmongN(bonuses: IBonus[]): IBonusOneAmongN {
  return { type: constants.BONUS_ONE_AMONG_N, bonuses };
}

export function skillRank(skill: string): IBonusSkillRank {
  return { type: constants.BONUS_SKILL_RANK, skill };
}

export function speciality(skill: string, specialityName: string): IBonusSpeciality {
  return { type: constants.BONUS_SPECIALITY, skill, speciality: specialityName };
}

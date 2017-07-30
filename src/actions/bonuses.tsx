import * as constants from '../constants/bonuses';
import { IBonus,
  IBonusDestiny, IBonusEntanglement, IBonusOneAmongN,
  IBonusSkillRank, IBonusSpeciality, IBonusStartingChi,
} from '../types/bonuses';

export function destiny(value: number): IBonusDestiny {
    return { type: constants.BONUS_DESTINY, value };
}

export function entanglement(value: number): IBonusEntanglement {
  return { type: constants.BONUS_ENTANGLEMENT, value };
}

export function startingChi(value: number): IBonusStartingChi {
  return { type: constants.BONUS_STARTING_CHI, value };
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

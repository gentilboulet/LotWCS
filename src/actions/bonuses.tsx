import * as constants from '../constants/bonuses';
import { IBonus,
  IBonusDestiny, IBonusEntanglement, IBonusStartingChi, IBonusOneAmongN,
  IBonusSkillRank, IBonusSpeciality,
} from '../types/bonuses';

export function destiny(v: number): IBonusDestiny {
    return { type: constants.BONUS_DESTINY, value: v};
}

export function entanglement(v: number): IBonusEntanglement {
  return { type: constants.BONUS_ENTANGLEMENT, value: v};
}

export function startingChi(v: number): IBonusStartingChi {
  return { type: constants.BONUS_STARTING_CHI, value: v};
}

export function oneAmongN(bonuses: IBonus[]): IBonusOneAmongN {
  return { type: constants.BONUS_ONE_AMONG_N, bonuses: bonuses };
}

export function skillRank(skill: string): IBonusSkillRank {
  return { type: constants.BONUS_SKILL_RANK, skill: skill };
}

export function speciality(skill: string, specialityName: string): IBonusSpeciality {
  return { type: constants.BONUS_SPECIALITY, skill: skill, speciality: specialityName };
}

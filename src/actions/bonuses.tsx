import * as constants from '../constants/bonuses';
import { IBonusDestiny, IBonusEntanglement, IBonusStartingChi } from '../types/bonuses';

export function destiny(v: number): IBonusDestiny {
    return { type: constants.BONUS_DESTINY, value: v};
}

export function entanglement(v: number): IBonusEntanglement {
  return { type: constants.BONUS_ENTANGLEMENT, value: v};
}

export function startingChi(v: number): IBonusStartingChi {
  return { type: constants.BONUS_STARTING_CHI, value: v};
}

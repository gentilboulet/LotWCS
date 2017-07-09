import * as constants from '../constants/bonuses';

export interface IBonusDestiny {
  type: constants.BONUS_DESTINY;
  value: number;
}

export interface IBonusEntanglement {
  type: constants.BONUS_ENTANGLEMENT;
  value: number;
}

export interface IBonusStartingChi {
  type: constants.BONUS_STARTING_CHI;
  value: number;
}

export type IBonus =
  IBonusDestiny
  | IBonusEntanglement
  | IBonusStartingChi
;

/* tslint:disable:no-any */
export function isBonus(bonus: any): boolean {
  switch (bonus.type) {
    case constants.BONUS_DESTINY:
    case constants.BONUS_ENTANGLEMENT:
    case constants.BONUS_STARTING_CHI:
      return true;
    default:
      return false;
  }
}

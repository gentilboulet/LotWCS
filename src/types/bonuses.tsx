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

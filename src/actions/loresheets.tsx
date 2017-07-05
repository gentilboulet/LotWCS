import * as constants from '../constants/loresheets';

export interface ILoresheetOpen {
  type: constants.LORESHEET_OPEN;
}

export interface ILoresheetBuyBonus {
  type: constants.LORESHEET_BUY_BONUS;
}

export type ILoresheetAction = ILoresheetOpen | ILoresheetBuyBonus;

export function loresheetOpen(s: string): ILoresheetOpen {
  return {
    type: constants.LORESHEET_OPEN,
  };
}

export function loresheetBuyBonus(s: string): ILoresheetBuyBonus {
  return {
    type: constants.LORESHEET_BUY_BONUS,
  };
}

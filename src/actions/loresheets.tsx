import * as constants from '../constants/loresheets';
import { ICost } from '../types/costs';

export interface ILoresheetOpen {
  type: constants.LORESHEET_OPEN;
  uid: string;
  cost: ICost;
}

export interface ILoresheetBuyBonus {
  type: constants.LORESHEET_BUY_BONUS;
  lsUid: string;
  uid: string;
  cost: ICost;
}

export type ILoresheetAction = ILoresheetOpen | ILoresheetBuyBonus;

export function loresheetOpen(uid: string, cost: ICost): ILoresheetOpen {
  return {
    type: constants.LORESHEET_OPEN,
    uid: uid,
    cost: cost,
  };
}

export function loresheetBuyBonus(lsUid: string, uid: string, cost: ICost): ILoresheetBuyBonus {
  return {
    type: constants.LORESHEET_BUY_BONUS,
    lsUid: lsUid,
    uid: uid,
    cost: cost,
  };
}

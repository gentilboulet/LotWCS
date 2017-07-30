import * as constants from '../constants/loresheets';
import { ICost } from '../types/costs';

export interface ILoresheetOpen {
  type: constants.LORESHEET_OPEN;
  uid: string;
  cost: ICost;
}

export interface ILoresheetBuyOption {
  type: constants.LORESHEET_BUY_OPTION;
  lsUid: string;
  uid: string;
  cost: ICost;
}

export type ILoresheetAction = ILoresheetOpen | ILoresheetBuyOption;

export function open(uid: string, cost: ICost): ILoresheetOpen {
  return {
    type: constants.LORESHEET_OPEN,
    uid: uid,
    cost: cost,
  };
}

export function buyOption(lsUid: string, uid: string, cost: ICost): ILoresheetBuyOption {
  return {
    type: constants.LORESHEET_BUY_OPTION,
    lsUid: lsUid,
    uid: uid,
    cost: cost,
  };
}

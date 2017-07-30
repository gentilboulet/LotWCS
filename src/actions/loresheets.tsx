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
  return { cost, type: constants.LORESHEET_OPEN, uid };
}

export function buyOption(lsUid: string, uid: string, cost: ICost): ILoresheetBuyOption {
  return { cost, lsUid, type: constants.LORESHEET_BUY_OPTION, uid };
}

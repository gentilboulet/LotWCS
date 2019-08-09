import * as dataLoresheets from "../../data/loresheets";
import * as constants from "../constants/loresheets";
import { ICost } from "../costs";

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
  payload?: string;
}

export type ILoresheetAction = ILoresheetOpen | ILoresheetBuyOption;

export function open(uid: string, cost: ICost): ILoresheetOpen {
  dataLoresheets.validateLoresheet(uid);
  return { cost, type: constants.LORESHEET_OPEN, uid };
}

export function buyOption(
  lsUid: string,
  uid: string,
  cost: ICost,
  payload?: string
): ILoresheetBuyOption {
  dataLoresheets.validateLoresheetOption(lsUid, uid);
  return { cost, lsUid, type: constants.LORESHEET_BUY_OPTION, uid, payload };
}

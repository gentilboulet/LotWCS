import produce from "immer";

import { ILoresheetAction } from "../actions/loresheets";
import { IStoreState } from "../type";

import { applyCost } from "../costs";
import { buyLoresheetOption, openLoresheet } from "../loresheets";

import * as constants from "../constants/loresheets";

export function loresheetsReducer(
  baseState: IStoreState,
  action: ILoresheetAction
): IStoreState {
  switch (action.type) {
    case constants.LORESHEET_OPEN:
      return produce(baseState, draftState => {
        applyCost(draftState, action.cost);
        openLoresheet(draftState.loresheets, action.uid);
        draftState.history.push(action);
      });
    case constants.LORESHEET_BUY_OPTION:
      return produce(baseState, draftState => {
        applyCost(draftState, action.cost);
        buyLoresheetOption(
          draftState.loresheets,
          action.lsUid,
          action.uid,
          action.payload
        );
        draftState.history.push(action);
      });
    default:
  }
  return baseState;
}

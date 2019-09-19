import produce from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/loresheets";
import { IStoreState } from "../type";

import { applyCost } from "../costs";
import { buyLoresheetOption, openLoresheet } from "../loresheets";

export function loresheetsReducer(
  baseState: IStoreState,
  action: ActionType<typeof actions>
): IStoreState {
  switch (action.type) {
    case getType(actions.open):
      return produce(baseState, draftState => {
        applyCost(draftState, action.payload.cost);
        openLoresheet(draftState.loresheets, action.payload.uid);
      });
    case getType(actions.buyOption):
      return produce(baseState, draftState => {
        applyCost(draftState, action.payload.cost);
        buyLoresheetOption(
          draftState.loresheets,
          action.payload.lsUid,
          action.payload.uid,
          action.payload.payload
        );
      });
    default:
  }
  return baseState;
}

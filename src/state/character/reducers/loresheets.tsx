import produce from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/loresheets";
import { ICharacterState } from "../models/type";

import { buyLoresheetOption, openLoresheet } from "../models//loresheets";
import { applyCost } from "../models/costs";

export function loresheetsReducer(
  baseState: ICharacterState,
  action: ActionType<typeof actions>,
): ICharacterState {
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
          action.payload.payload,
        );
      });
    default:
  }
  return baseState;
}

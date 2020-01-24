import produce from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/loresheets";
import { ILoresheetsState } from "../models/loresheets";

import { buyLoresheetOption, openLoresheet } from "../models//loresheets";

export function loresheetsReducer(
  state: ILoresheetsState,
  action: ActionType<typeof actions>,
): ILoresheetsState {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.open):
        openLoresheet(draft, action.payload.uid);
        break;
      case getType(actions.buyOption):
        buyLoresheetOption(
          draft,
          action.payload.lsUid,
          action.payload.uid,
          action.payload.payload,
        );
        break;
      default:
    }
  });
}

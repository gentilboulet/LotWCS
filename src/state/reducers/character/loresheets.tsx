import { Draft, produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/character/loresheets";
import {
  buyLoresheetOption,
  ILoresheetsState,
  openLoresheet,
} from "../../models/character/loresheets";

export const loresheetsReducer = produce(
  (draft: Draft<ILoresheetsState>, action: ActionType<typeof actions>) => {
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
  },
);

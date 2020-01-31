import { produce, Draft } from "immer";
import { ActionType, getType } from "typesafe-actions";

import { IHistoryState } from "../index";

import * as actions from "../actions/history";

export const historyReducer = produce(
  (draft: Draft<IHistoryState>, action: ActionType<typeof actions>) => {
    switch (action.type) {
      case getType(actions.historyPush):
        draft.actions.push(action.payload.action);
        break;
      default:
    }
  },
);

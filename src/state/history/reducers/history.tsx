import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import { IHistoryState } from "../index";

import * as actions from "../actions/history";
import { emptyStateFactory } from "../models/history";

export function historyReducer(
  state: IHistoryState,
  action: ActionType<typeof actions>,
): IHistoryState {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.resetToInitialState):
        return emptyStateFactory();
      case getType(actions.historyPush):
        draft.actions.push(action.payload.a);
        break;
      default:
        return;
    }
  });
}

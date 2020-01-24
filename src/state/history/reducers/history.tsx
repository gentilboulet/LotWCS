import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import { IHistoryState } from "../index";

import * as actions from "../actions/history";

export function historyReducer(
  state: IHistoryState,
  action: ActionType<typeof actions>,
): IHistoryState {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.historyPush):
        draft.actions.push(action.payload.action);
        break;
      default:
        return;
    }
  });
}

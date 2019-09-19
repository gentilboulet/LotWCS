import { ActionType, getType } from "typesafe-actions";

import { IStoreState } from "../type";

import * as actions from "../actions/history";
import { replayHistory } from "../history";
import { emptyStateFactory } from "../initial";

export function historyReducer(
  state: IStoreState,
  action: ActionType<typeof actions>
): IStoreState {
  switch (action.type) {
    case getType(actions.resetToInitialState):
      return emptyStateFactory();
    case getType(actions.historyDeleteUpTo):
      if (state.history.length === action.payload.id + 1) {
        return state;
      }
      return replayHistory(
        emptyStateFactory(),
        state.history.slice(0, action.payload.id + 1)
      );
    default:
      return state;
  }
}

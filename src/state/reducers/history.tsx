import { ActionType, getType } from "typesafe-actions";

import { IStoreState } from "../type";

import * as actions from "../actions/history";
import { replayHistory } from "../history";

export function historyReducer(
  baseState: IStoreState,
  action: ActionType<typeof actions>
): IStoreState {
  switch (action.type) {
    case getType(actions.historyDeleteUpTo):
      return replayHistory(
        baseState,
        baseState.history.slice(0, action.payload.id + 1)
      ); // +1 needed to skip initialState
    default:
      return baseState;
  }
}

import { IStoreState } from "../type";

import { IHistoryAction } from "../actions/history";
import * as constants from "../constants/history";
import { replayHistory } from "../history";

export function historyReducer(
  baseState: IStoreState,
  action: IHistoryAction
): IStoreState {
  switch (action.type) {
    case constants.HISTORY_DELETE:
      return replayHistory(
        baseState,
        baseState.history.slice(0, action.id + 1)
      ); // +1 needed to skip initialState
    default:
      return baseState;
  }
}

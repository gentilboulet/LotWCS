import { getType, isActionOf } from "typesafe-actions";

import * as actions from "./actions/history";
import { IHistoryAction as a } from "./actions/types";
import { IHistoryState as s, TInHistoryActions as t } from "./models/history";
import { historyReducer } from "./reducers/history";
export { initialStateFactory } from "./models/history";

export type IHistoryState = s;
export type IHistoryAction = a;
export type TInHistoryActions = t;

export function isHistoryAction(action: any): boolean {
  if (isActionOf(Object.values(actions), action)) {
    return true;
  }
  return false;
}

export function isResetToInitialStateAction(action: any): boolean {
  return action.type === getType(actions.resetToInitialState);
}

export function globalReducer(
  state: IHistoryState,
  action: IHistoryAction,
): IHistoryState {
  return historyReducer(state, action);
}

import { isActionOf } from "typesafe-actions";

import * as actions from "./actions/history";
import { IHistoryAction as a } from "./actions/types";
import { IHistoryState as s } from "./models/history";
import { historyReducer } from "./reducers/history";
export { initialStateFactory } from "./models/history";

export type IHistoryState = s;
export type IHistoryAction = a;

export function isHistoryAction(action: any): IHistoryAction | undefined {
  if (isActionOf(Object.values(actions), action)) {
    return action;
  }
  return undefined;
}

export function globalReducer(
  state: IHistoryState,
  action: IHistoryAction,
): IHistoryState {
  return historyReducer(state, action);
}

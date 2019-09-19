import { Dispatch, Store } from "redux";
import { getType } from "typesafe-actions";

import * as actions from "../actions/history";
import { IAction } from "../actions/types";
import { IStoreState } from "../type";

export const pushToHistory = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>
) => (action: IAction) => {
  const result = next(action);
  if (action.type !== getType(actions.historyDeleteUpTo)) {
    store.getState().history.push(action);
  }
  return result;
};

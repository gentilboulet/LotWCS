import { Dispatch, Store } from "redux";

import { historyPush } from "../actions/history";
import { IAction, IStoreState } from "../index";

export const middleware = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>,
) => (action: IAction) => {
  const result = next(action);

  if ("meta" in action && "inHistory" in action.meta) {
    if (action.meta.inHistory) {
      store.dispatch(historyPush(action));
    }
  }
  return result;
};

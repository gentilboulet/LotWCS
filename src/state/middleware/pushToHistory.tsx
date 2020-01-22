import { Dispatch, Store } from "redux";

import { ICharacterAction, isCharacterAction } from "../character";
import { historyPush } from "../history/actions/history";
import { IAction, IStoreState } from "../index";

export const middleware = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>
) => (action: IAction) => {
  const result = next(action);
  if (isCharacterAction(action)) {
    store.dispatch(historyPush(action as ICharacterAction));
  }
  return result;
};

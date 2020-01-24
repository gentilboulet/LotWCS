import { Dispatch, Store } from "redux";

import { isCharacterAction } from "../character";
import { historyPush } from "../history/actions/history";
import { IAction, IStoreState } from "../index";

export const middleware = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>,
) => (action: IAction) => {
  const result = next(action);
  const characterAction = isCharacterAction(action);
  if (characterAction) {
    if ("meta" in characterAction) {
      if ("skipHistory" in characterAction.meta) {
        if (characterAction.meta.skipHistory) {
          store.dispatch(historyPush(characterAction));
        }
      }
    }
    store.dispatch(historyPush(characterAction));
  }
  return result;
};

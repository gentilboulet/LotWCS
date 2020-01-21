import { Dispatch, Store } from "redux";

import { ICharacterAction, isCharacterAction } from "../character";
import { IAction, IStoreState } from "../index";

export const middleware = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>
) => (action: IAction) => {
  const result = next(action);
  if (isCharacterAction(action)) {
    store.getState().history.actions.push(action as ICharacterAction);
  }
  return result;
};

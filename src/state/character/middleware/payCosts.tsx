import { Dispatch, Store } from "redux";

import { isCharacterAction } from "../index";
import { payCost } from "../actions/costs";
import { IAction, IStoreState } from "../../index";

export const middleware = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>,
) => (action: IAction) => {
  const result = next(action);
  const charAction = isCharacterAction(action);
  if (charAction) {
    if ("payload" in charAction)
      if ("cost" in charAction.payload) {
        store.dispatch(payCost(charAction.payload.cost));
      }
  }
  return result;
};

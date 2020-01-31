import { Dispatch, Store } from "redux";
import { getType } from "typesafe-actions";

import { isCharacterAction } from "../index";
import { payCost } from "../actions/costs";
import { IAction, IStoreState } from "../../index";

export const middleware = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>,
) => (action: IAction) => {
  const result = next(action);

  const charAction = isCharacterAction(action);
  if (charAction && charAction.type !== getType(payCost)) {
    if ("payload" in charAction && "cost" in charAction.payload) {
      store.dispatch(payCost(charAction.payload.cost));
    }
  }
  return result;
};

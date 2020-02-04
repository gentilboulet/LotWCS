import { Dispatch, Store } from "redux";

import { IBonus, isBonus } from "../../../perks/bonuses";
import { IDiscount, isDiscount } from "../../../perks/discounts";
import { isCharacterAction } from "../../actions/character";
import * as actions from "../../actions/character/perks";
import { IAction, IStoreState } from "../../index";

export const middleware = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>,
) => (action: IAction) => {
  const result = next(action);
  const charAction = isCharacterAction(action);
  if (charAction) {
    if ("perks" in charAction.payload) {
      const bonuses = charAction.payload.perks.filter(p =>
        isBonus(p),
      ) as IBonus[];
      if (bonuses.length > 0) store.dispatch(actions.applyBonus(bonuses));
      const discounts = charAction.payload.perks.filter(p =>
        isDiscount(p),
      ) as IDiscount[];
      if (discounts.length > 0) store.dispatch(actions.pushDiscount(discounts));
    }
  }
  return result;
};

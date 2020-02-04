import { Dispatch, Store } from "redux";

import { IBonus, isBonus } from "../../../perks/bonuses";
import { IDiscount, isDiscount } from "../../../perks/discounts";
import { IAction, IStoreState } from "../../index";
import { isApplicable } from "../../models/character/automatics";
import { applyBonuses } from "../../models/character/bonuses";

export const middleware = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>,
) => (action: IAction) => {
  const result = next(action);
  const newState = store.getState();
  const applied = newState.character.automatics
    .map((auto, index) => {
      if (isApplicable(newState.character, auto)) {
        applyBonuses(
          newState.character,
          auto.perks.filter(isBonus) as IBonus[],
        );
        newState.character.discounts.push(
          ...(auto.perks.filter(isDiscount) as IDiscount[]),
        );
        return index;
      }
      return -1;
    })
    .filter(idx => idx >= 0);
  applied.sort((a, b) => (a < b ? a : b)); // reverse order !
  applied.forEach(idx => {
    newState.character.automatics.splice(idx, 1);
  });

  return result;
};

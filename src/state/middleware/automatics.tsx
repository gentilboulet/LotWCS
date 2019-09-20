import { Dispatch, Store } from "redux";

import { IAction } from "../actions/types";
import { IStoreState } from "../type";

import { IBonus, isBonus } from "../../perks/bonuses";
import { IDiscount, isDiscount } from "../../perks/discounts";

import { isApplicable } from "../automatics";
import { applyBonuses } from "../bonuses";

export const middleware = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>
) => (action: IAction) => {
  const result = next(action);
  const newState = store.getState();
  const applied = newState.automatics
    .map((auto, index) => {
      if (isApplicable(newState, auto)) {
        applyBonuses(newState, auto.perks.filter(isBonus) as IBonus[]);
        newState.discounts.push(
          ...(auto.perks.filter(isDiscount) as IDiscount[])
        );
        return index;
      }
      return -1;
    })
    .filter(idx => idx >= 0);
  applied.sort((a, b) => (a < b ? a : b)); // reverse order !
  applied.forEach(idx => {
    newState.automatics.splice(idx, 1);
  });

  return result;
};

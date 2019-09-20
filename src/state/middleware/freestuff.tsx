import { Dispatch, Store } from "redux";

import { IAction } from "../actions/types";
import { IStoreState } from "../type";

import {
  IAutomaticCondition,
  isAutomaticCondition
} from "../../perks/automatics";
import { IBonus, isBonus } from "../../perks/bonuses";
import { IDiscount, isDiscount } from "../../perks/discounts";

import { isApplicable } from "../automatics";
import { applyBonuses } from "../bonuses";

import { getLoresheets } from "../../data/loresheets";

const automatics = getLoresheets()
  .flatMap(ls => (!ls.perks ? [] : ls.perks))
  .filter(perk => isAutomaticCondition(perk)) as IAutomaticCondition[];

export const freeStuff = (store: Store<IStoreState>) => (
  next: Dispatch<IAction>
) => (action: IAction) => {
  const result = next(action);
  const newState = store.getState();
  console.log("start automatics", automatics);
  const applied = automatics
    .map((auto, index) => {
      if (isApplicable(newState, auto)) {
        console.log("free stuff triggered for ", auto);
        applyBonuses(newState, auto.perks.filter(isBonus) as IBonus[]);
        newState.discounts.push(
          ...(auto.perks.filter(isDiscount) as IDiscount[])
        );
        return index;
      }
      return -1;
    })
    .filter(idx => idx > 0);
  applied.sort((a, b) => (a < b ? a : b)); // reverse order !
  applied.forEach(idx => {
    automatics.splice(idx);
  });
  console.log("final automatics", automatics);

  return result;
};

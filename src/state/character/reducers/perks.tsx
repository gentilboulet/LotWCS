import { produce, Draft } from "immer";
import { ActionType, getType } from "typesafe-actions";
import { ICharacterState } from "../models/type";
import * as actions from "../actions/perks";
import { applyBonuses } from "../models/bonuses";
import { pushToDiscounts } from "../models/discounts";

export const perksReducer = produce(
  (draft: Draft<ICharacterState>, action: ActionType<typeof actions>) => {
    switch (action.type) {
      case getType(actions.applyBonus):
        applyBonuses(draft, action.payload.bonuses);
        break;
      case getType(actions.pushDiscount):
        pushToDiscounts(draft, action.payload.discounts);
        break;
      default:
    }
  },
);

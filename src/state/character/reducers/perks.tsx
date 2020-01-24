import produce from "immer";
import { ActionType, getType } from "typesafe-actions";
import { ICharacterState } from "../models/type";
import * as actions from "../actions/perks";
import { applyBonuses } from "../models/bonuses";
import { pushToDiscounts } from "../models/discounts";

export function perksReducer(
  state: ICharacterState,
  action: ActionType<typeof actions>,
): ICharacterState {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.applyBonus):
        applyBonuses(draft, action.payload.bonuses);
        break;
      case getType(actions.pushDiscount):
        pushToDiscounts(draft, action.payload.discounts);
        break;
      default:
    }
  });
}

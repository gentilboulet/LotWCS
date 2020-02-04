import { Draft, produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/character/perks";
import { ICharacterState } from "../../models/character";
import { applyBonuses } from "../../models/character/bonuses";
import { pushToDiscounts } from "../../models/character/discounts";

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

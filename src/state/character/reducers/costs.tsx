import { produce, Draft } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/costs";
import { applyCost } from "../models/costs";
import { ICharacterState } from "../models/type";

export type ICostAction = ActionType<typeof actions>;

export const costReducer = produce(
  (draft: Draft<ICharacterState>, action: ICostAction) => {
    switch (action.type) {
      case getType(actions.payCost):
        applyCost(draft, action.payload.cost);
        break;
      default:
    }
  },
);

import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/costs";
import { applyCost } from "../models/costs";
import { ICharacterState } from "../models/type";

export type ICostAction = ActionType<typeof actions>;

export function costReducer(
  baseState: ICharacterState,
  action: ICostAction,
): ICharacterState {
  switch (action.type) {
    case getType(actions.payCost):
      return produce(baseState, draftState => {
        applyCost(draftState, action.payload.cost);
      });
    default:
  }
  return baseState;
}

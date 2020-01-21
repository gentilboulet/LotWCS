import produce from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/virtues";
import { ICharacterState } from "../models/type";

import { applyCost } from "../models/costs";
import { increase } from "../models/virtues";

export function virtuesReducer(
  baseState: ICharacterState,
  action: ActionType<typeof actions>
): ICharacterState {
  switch (action.type) {
    case getType(actions.increase):
      return produce(baseState, state => {
        applyCost(state, action.payload.cost);
        increase(state.virtues, action.payload.name, action.payload.value);
      });
    default:
  }
  return baseState;
}

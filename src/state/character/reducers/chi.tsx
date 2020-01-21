import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/chi";
import { applyCost } from "../models/costs";
import { ICharacterState } from "../models/type";

import { increase } from "../models/chi";

export type IChiAction = ActionType<typeof actions>;

export function chiReducer(
  baseState: ICharacterState,
  action: IChiAction
): ICharacterState {
  switch (action.type) {
    case getType(actions.chiBuy):
      return produce(baseState, draftState => {
        applyCost(draftState, action.payload.cost);
        increase(draftState.chi, action.payload.chi, action.payload.value);
      });
    default:
  }
  return baseState;
}

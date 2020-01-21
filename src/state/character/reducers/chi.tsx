import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/chi";
import { applyCost } from "../costs";
import { IStoreState } from "../type";

import { increase } from "../chi";

export function chiReducer(
  baseState: IStoreState,
  action: ActionType<typeof actions>
): IStoreState {
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

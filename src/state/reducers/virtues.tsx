import produce from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/virtues";
import { IStoreState } from "../type";

import { applyCost } from "../costs";
import { increase } from "../virtues";

export function virtuesReducer(
  baseState: IStoreState,
  action: ActionType<typeof actions>
): IStoreState {
  switch (action.type) {
    case getType(actions.increase):
      return produce(baseState, state => {
        applyCost(state, action.payload.cost);
        increase(state.virtues, action.payload.name, action.payload.value);
        state.history.push(action);
      });
    default:
  }
  return baseState;
}

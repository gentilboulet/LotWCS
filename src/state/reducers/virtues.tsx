import produce from "immer";

import { IVirtueAction } from "../actions/virtues";
import * as constants from "../constants/virtues";
import { IStoreState } from "../type";

import { applyCost } from "../costs";
import { increase } from "../virtues";

export function virtuesReducer(
  baseState: IStoreState,
  action: IVirtueAction
): IStoreState {
  switch (action.type) {
    case constants.VIRTUE_INCREASE:
      return produce(baseState, state => {
        applyCost(state, action.cost);
        increase(state.virtues, action.name, action.value);
        state.history.push(action);
      });
    default:
  }
  return baseState;
}

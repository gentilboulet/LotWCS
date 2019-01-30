import { produce } from "immer";

import { IChiAction } from "../actions/chi";
import { applyCost } from "../costs";
import { IStoreState } from "../type";

import * as constants from "../constants/chi";

import { increase } from "../chi";

export function chiReducer(
  baseState: IStoreState,
  action: IChiAction
): IStoreState {
  switch (action.type) {
    case constants.CHI_BUY:
      return produce(baseState, draftState => {
        applyCost(draftState, action.cost);
        increase(draftState.chi, action.chi, action.value);
        draftState.history.push(action);
      });
    default:
  }
  return baseState;
}

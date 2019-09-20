import { produce } from "immer";
import { getType } from "typesafe-actions";

import * as actions from "./actions/history";
import { IAction } from "./actions/types";
import { globalReducer } from "./reducers/global";
import { IStoreState } from "./type";

export type THistoryState = IAction[];

export function replayHistory(
  state: IStoreState,
  toReplay: IAction[]
): IStoreState {
  return produce(state, draftState => {
    for (const action of toReplay) {
      draftState = globalReducer(draftState, action);
      if (action.type !== getType(actions.resetToInitialState)) {
        draftState.history.push(action); // don't push this one, initial state already comes with it
      }
    }
    return draftState;
  });
}

export function createState(): THistoryState {
  return [actions.resetToInitialState()];
}

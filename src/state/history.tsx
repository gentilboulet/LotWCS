import { resetToInitialState } from "./actions/initial";
import { IAction } from "./actions/types";
import { globalReducer } from "./reducers/global";
import { IStoreState } from "./type";

export type THistoryState = IAction[];

export function replayHistory(
  state: IStoreState,
  actions: IAction[]
): IStoreState {
  for (const action of actions) {
    state = globalReducer(state, action);
  }
  return state;
}

export function createState(): THistoryState {
  return [resetToInitialState()];
}

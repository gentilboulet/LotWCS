// import { produce } from "immer";
// import { getType } from "typesafe-actions";
//
// import * as actions from "../actions/history";
import { ICharacterAction } from "../../character/actions/types";
// import { IHistoryAction } from "../actions/types";
// import { globalReducer } from "../reducers/global";
//
export interface IHistoryState {
  actions: ICharacterAction[];
}

export function initialStateFactory(): IHistoryState {
  return { actions: [] };
}
// export function replayHistory(
//   state: ICharacterState,
//   toReplay: IAction[]
// ): ICharacterState {
//   return produce(state, draftState => {
//     for (const action of toReplay) {
//       draftState = globalReducer(draftState, action);
//       if (action.type !== getType(actions.resetToInitialState)) {
//         draftState.history.push(action); // don't push this one, initial state already comes with it
//       }
//     }
//     return draftState;
//   });
// }

// export function createState(): THistoryState {
//   return [actions.resetToInitialState()];
// }

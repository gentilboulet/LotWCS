import { ActionType } from "typesafe-actions";
import { ICharacterAction } from "../../character";
import * as actions from "../actions/history";

export type TInHistoryActions =
  | ICharacterAction
  | ActionType<typeof actions.resetToInitialState>;

export interface IHistoryState {
  actions: TInHistoryActions[];
}

export function initialStateFactory(): IHistoryState {
  return { actions: [actions.resetToInitialState()] };
}

export function emptyStateFactory(): IHistoryState {
  return { actions: [] };
}

import { ICharacterAction } from "../../character";

export interface IHistoryState {
  actions: ICharacterAction[];
}

export function initialStateFactory(): IHistoryState {
  return { actions: [] };
}

export function emptyStateFactory(): IHistoryState {
  return { actions: [] };
}

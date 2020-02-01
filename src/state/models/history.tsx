import { ICharacterAction } from "../actions/character";

export interface IHistoryState {
  actions: ICharacterAction[];
}

export function initialStateFactory(): IHistoryState {
  return { actions: [] };
}

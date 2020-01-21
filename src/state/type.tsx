import * as character from "./character";
import * as history from "./history";

export interface IStoreState {
  character: character.ICharacterState;
  history: history.IHistoryState;
}

export type IAction = character.ICharacterAction;

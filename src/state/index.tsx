import { produce } from "immer";
import * as character from "./character";
import * as history from "./history";

export interface IStoreState {
  character: character.ICharacterState;
  history: history.IHistoryState;
}

export type IAction = character.ICharacterAction | history.IHistoryAction;

export function initialStateFactory(): IStoreState {
  return {
    character: character.initialStateFactory(),
    history: history.initialStateFactory()
  };
}

export function globalReducer(
  state: IStoreState | undefined,
  action: IAction
): IStoreState {
  if (!state) {
    return globalReducer(initialStateFactory(), action);
  }
  return produce(state, draft => {
    if (character.isCharacterAction(action)) {
      draft.character = character.globalReducer(
        draft.character,
        action as character.ICharacterAction
      );
    }
    if (history.isHistoryAction(action)) {
      draft.history = history.globalReducer(
        draft.history,
        action as history.IHistoryAction
      );
    }
  });
}

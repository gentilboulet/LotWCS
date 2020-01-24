import { produce } from "immer";
import { getType } from "typesafe-actions";
import * as character from "./character";
import * as history from "./history";
import * as meta from "./actions/meta";
import { IGlobalAction } from "./actions/types";

export interface IStoreState {
  character: character.ICharacterState;
  history: history.IHistoryState;
}

export type IAction =
  | character.ICharacterAction
  | history.IHistoryAction
  | IGlobalAction;

export function initialStateFactory(): IStoreState {
  return {
    character: character.initialStateFactory(),
    history: history.initialStateFactory(),
  };
}

export function testingStateFactory(): IStoreState {
  return {
    character: character.testingStateFactory(),
    history: history.initialStateFactory(),
  };
}

export function globalReducer(
  state: IStoreState,
  action: IAction,
): IStoreState {
  // Meta actions handling first
  switch (action.type) {
    case getType(meta.characterHistoryReplay):
      return produce(initialStateFactory(), draft => {
        action.payload.actions.forEach(
          (charAction: character.ICharacterAction) => {
            draft.character = character.globalReducer(
              draft.character,
              charAction,
            );
          },
        );
        draft.history.actions = action.payload.actions;
      });
    case getType(meta.initialStateAction):
      return initialStateFactory();
  }

  // Substate reducers
  return produce(state, draft => {
    if (character.isCharacterAction(action)) {
      draft.character = character.globalReducer(
        draft.character,
        action as character.ICharacterAction,
      );
    }

    if (history.isHistoryAction(action)) {
      draft.history = history.globalReducer(
        draft.history,
        action as history.IHistoryAction,
      );
    }
  });
}

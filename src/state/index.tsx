import { produce } from "immer";
import { getType } from "typesafe-actions";
import * as character from "./character";
import * as history from "./history";
import * as historyActions from "./history/actions/history";

export interface IStoreState {
  character: character.ICharacterState;
  history: history.IHistoryState;
}

export type IAction = character.ICharacterAction | history.IHistoryAction;

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
  state: IStoreState | undefined,
  action: IAction,
): IStoreState {
  if (!state) {
    return globalReducer(initialStateFactory(), action);
  }
  return produce(state, draft => {
    if (action.type === getType(historyActions.historyDeleteUpTo)) {
      if (state.history.actions.length === action.payload.id + 1) {
        return state;
      }
      return playActions(
        initialStateFactory(),
        state.history.actions.slice(0, action.payload.id + 1),
      );
    }

    if (character.isCharacterAction(action)) {
      draft.character = character.globalReducer(
        draft.character,
        action as character.ICharacterAction,
      );
    } else if (history.isResetToInitialStateAction(action)) {
      draft.character = character.initialStateFactory();
    }

    if (history.isHistoryAction(action)) {
      draft.history = history.globalReducer(
        draft.history,
        action as history.IHistoryAction,
      );
    }
  });
}

export function playActions(
  state: IStoreState | undefined,
  actions: IAction[],
): IStoreState {
  if (!state) {
    return playActions(initialStateFactory(), actions);
  }
  return produce(state, draft => {
    draft.character = character.playActions(
      draft.character,
      actions.filter(a =>
        character.isCharacterAction(a),
      ) as character.ICharacterAction[],
    );

    draft.history.actions = actions as history.TInHistoryActions[]; // hacky
  });
}

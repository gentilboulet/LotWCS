import { produce, Draft } from "immer";
import { isActionOf, getType } from "typesafe-actions";
import {
  ICharacterAction,
  actions as characterActions,
} from "./actions/character";
import { IHistoryAction, actions as historyActions } from "./actions/history";
import { IMetaAction, actions as metaActions } from "./actions/meta";

import {
  ICharacterState,
  initialStateFactory as characterStateFactory,
} from "./models/character";
import {
  IHistoryState,
  initialStateFactory as historyStateFactory,
} from "./models/history";

import { globalReducer as characterReducer } from "./reducers/character";
import { historyReducer } from "./reducers/history";

export interface IStoreState {
  character: ICharacterState;
  history: IHistoryState;
}

export type IAction = ICharacterAction | IHistoryAction | IMetaAction;

export function initialStateFactory(): IStoreState {
  return {
    character: characterStateFactory(),
    history: historyStateFactory(),
  };
}

export const globalReducer = produce(
  (draft: Draft<IStoreState>, action: IAction) => {
    switch (action.type) {
      case getType(metaActions.characterHistoryReplay):
        action.payload.actions.forEach((a: ICharacterAction) => {
          draft.character = characterReducer(draft.character, a);
        });
        draft.history.actions = action.payload.actions;
        return;
      case getType(metaActions.initialStateAction):
        return initialStateFactory();
    }

    if (isActionOf(Object.values(characterActions), action)) {
      draft.character = characterReducer(draft.character, action);
    }
    if (isActionOf(Object.values(historyActions), action)) {
      draft.history = historyReducer(draft.history, action);
    }
  },
  initialStateFactory(),
);

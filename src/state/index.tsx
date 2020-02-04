import { Draft, produce } from "immer";
import { getType, isActionOf } from "typesafe-actions";
import {
  actions as characterActions,
  ICharacterAction,
} from "./actions/character";
import { actions as historyActions, IHistoryAction } from "./actions/history";
import { actions as metaActions, IMetaAction } from "./actions/meta";

import {
  ICharacterState,
  initialStateFactory as characterStateFactory,
} from "./models/character";
import {
  testingStateFactory as characterTestingStateFactory,
} from "./models/character/testing";
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

export function testingStateFactory(): IStoreState {
  return {
    character: characterTestingStateFactory(),
    history: historyStateFactory(),
  };
}
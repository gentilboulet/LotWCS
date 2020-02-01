import { createAction, ActionType } from "typesafe-actions";
import { ICharacterAction } from "./character";

export const characterHistoryReplay = createAction(
  "meta/REPLAY_CHARACTER_HISTORY",
  (actions: ICharacterAction[]) => {
    return { actions };
  },
)();

export const initialStateAction = createAction("meta/INITIAL_STATE")();

export const historyMetaCreator = () => {
  return {
    inHistory: true,
  };
};

export const actions = { characterHistoryReplay, initialStateAction };

export type IMetaAction = ActionType<typeof actions>;

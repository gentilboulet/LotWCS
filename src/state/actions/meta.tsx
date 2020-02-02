import { createAction, ActionType } from "typesafe-actions";
import { ICharacterAction } from "./character";

const characterHistoryReplay = createAction(
  "meta/REPLAY_CHARACTER_HISTORY",
  (actions: ICharacterAction[]) => {
    return { actions };
  },
)();

const initialStateAction = createAction("meta/INITIAL_STATE")();

export const actions = { characterHistoryReplay, initialStateAction };

export const historyMetaCreator = () => {
  return {
    inHistory: true,
  };
};

export type IMetaAction = ActionType<typeof actions>;

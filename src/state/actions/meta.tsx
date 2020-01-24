import { createAction } from "typesafe-actions";
import { ICharacterAction } from "../character";

export const characterHistoryReplay = createAction(
  "meta/REPLAY_CHARACTER_HISTORY",
  (actions: ICharacterAction[]) => {
    return { actions };
  },
)();

export const initialStateAction = createAction("meta/INITIAL_STATE")();

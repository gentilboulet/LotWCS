import { createAction } from "typesafe-actions";
import { ICharacterAction } from "../../character";

export const historyPush = createAction(
  "history/PUSH_TO_HISTORY",
  (a: ICharacterAction) => {
    return { a };
  },
)();

export const historyDeleteUpTo = createAction(
  "history/DELETE_UP_TO",
  (id: number) => {
    return { id };
  },
)();

export const resetToInitialState = createAction("history/INITIAL_STATE")();

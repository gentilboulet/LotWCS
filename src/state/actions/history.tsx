import { ActionType, createAction } from "typesafe-actions";
import { ICharacterAction } from "./character";

export const historyPush = createAction(
  "history/PUSH_TO_HISTORY",
  (action: ICharacterAction) => {
    return { action };
  },
)();

export type IHistoryAction = ActionType<typeof historyPush>;

export const actions = { historyPush };

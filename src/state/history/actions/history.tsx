import { createAction } from "typesafe-actions";
import { ICharacterAction } from "../../character";

export const historyPush = createAction(
  "history/PUSH_TO_HISTORY",
  action => (a: ICharacterAction) => {
    return action({ a });
  }
);

export const historyDeleteUpTo = createAction(
  "history/DELETE_UP_TO",
  action => (id: number) => {
    return action({ id });
  }
);

export const resetToInitialState = createAction(
  "history/INITIAL_STATE",
  action => () => {
    return action();
  }
);

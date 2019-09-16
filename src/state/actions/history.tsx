import { createAction } from "typesafe-actions";

export const historyDeleteUpTo = createAction(
  "history/DELETE",
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

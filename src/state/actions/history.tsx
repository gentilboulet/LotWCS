import * as constants from "../constants/history";

export interface IHistoryDeleteUpTo {
  type: constants.HISTORY_DELETE;
  id: number;
}

export type IHistoryAction = IHistoryDeleteUpTo;

export function historyDeleteUpTo(id: number): IHistoryDeleteUpTo {
  return { type: constants.HISTORY_DELETE, id };
}

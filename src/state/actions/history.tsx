import * as constants from 'state/constants/history';

export interface IhistoryDeleteUpTo {
  type: constants.HISTORY_DELETE;
  id: number;
}

export type IHistoryAction = IhistoryDeleteUpTo;

export function historyDeleteUpTo(id: number): IhistoryDeleteUpTo {
  return { type: constants.HISTORY_DELETE, id };
}

import * as constants from '../constants/history';

export interface IHistoryDelete {
  type: constants.HISTORY_DELETE;
  id: number;
}

export type IHistoryAction = IHistoryDelete;

export function historyDelete(id: number): IHistoryDelete {
  return {
    type: constants.HISTORY_DELETE,
    id: id,
  };
}

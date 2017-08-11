import * as constants from 'constants/history';
import { IHistoryAction } from 'state/actions/history';
import * as history from 'state/history';
import { IStoreState } from 'state/types';
import { IAction } from 'state/actions/types';

export function historyReducer(oldState: IStoreState, action: IHistoryAction): IStoreState {
  switch (action.type) {
    case constants.HISTORY_DELETE:
      const list: IAction[] = oldState.get('history').toJS();
      return history.replayHistory(oldState, list.slice(0, action.id + 1)); // +1 needed to skip initialState
    default:
      return oldState;
  }
}

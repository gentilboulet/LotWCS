import { ILoresheetAction } from 'state/actions/loresheets';
import { IStoreState } from 'state/types';

import { applyCost } from 'costs/reducer';
import * as constants from 'state/constants/loresheets';
import { pushToHistory } from 'state/history';

import * as loresheets from 'state/loresheets';

export function loresheetsReducer(oldState: IStoreState, action: ILoresheetAction): IStoreState {
  switch (action.type) {
    case constants.LORESHEET_OPEN:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);
        loresheets.addLoresheet(state, action.uid);
        pushToHistory(state, action);
      });
    case constants.LORESHEET_BUY_OPTION:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);
        loresheets.addLoresheetOption(state, action.lsUid, action.uid);
        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

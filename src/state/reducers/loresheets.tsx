import produce from "immer"

import { ILoresheetAction } from 'state/actions/loresheets';
import { IStoreState } from 'state/type';

import { addLoresheetOption, openLoresheet } from 'state/loresheets';

import * as constants from 'state/constants/loresheets';

export function loresheetsReducer(baseState: IStoreState, action: ILoresheetAction): IStoreState {
  switch (action.type) {
    case constants.LORESHEET_OPEN:
      return produce(baseState, draftState => {
        // applyCosts(draftState, action.cost)
        openLoresheet(draftState.loresheets, action.uid);
        draftState.history.push(action);
      });
    case constants.LORESHEET_BUY_OPTION:
      return produce(baseState, draftState => {
        // applyCosts(draftState, action.cost)
        addLoresheetOption(draftState.loresheets, action.lsUid, action.uid);
        draftState.history.push(action);
      });
    default:
  }
  return baseState;
}

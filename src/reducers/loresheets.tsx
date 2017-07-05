import { ILoresheetAction } from '../actions/loresheets';
import { IStoreState } from '../types/state';
import * as constants from '../constants/loresheets';
import { pushToHistory } from './history';

export function headerReducer(oldState: IStoreState, action: ILoresheetAction): IStoreState {
  switch (action.type) {
    case constants.LORESHEET_OPEN:
      return oldState.withMutations(state => {
        pushToHistory(state, action);
      });
    case constants.LORESHEET_BUY_BONUS:
      return oldState.withMutations(state => {
        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

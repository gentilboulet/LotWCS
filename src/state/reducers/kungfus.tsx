import { IKungFuAction } from 'state/actions/kungfus';
import { IStoreState } from 'state/types';
import { pushToHistory } from 'state/history';
import { applyCost } from 'costs/reducer';

import * as kungfus from 'state/kungfus';
import * as constants from 'constants/kungfus';

export function kungfuReducer(oldState: IStoreState, action: IKungFuAction): IStoreState {
  switch (action.type) {
      case constants.KUNGFU_OPEN_STYLE:
        return oldState.withMutations(state => {
          applyCost(state, action.cost);
          kungfus.openStyle(state, action.kungfuType, action.uid);
          pushToHistory(state, action);
        });
      case constants.KUNGFU_BUY_TECHNIQUE:
        return oldState.withMutations(state => {
          applyCost(state, action.cost);
          kungfus.buyTechnique(state, action.kungfuType, action.styleUid, action.uid);
          pushToHistory(state, action);
        });
      case constants.KUNGFU_CUSTOM_NAME_FOR_STYLE:
      case constants.KUNGFU_CUSTOM_NAME_FOR_TECHNIQUE:
    default:
  }
  return oldState;
}

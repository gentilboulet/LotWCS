import { produce } from 'immer';

import { IKungFuAction } from 'state/actions/kungfu';
import { IStoreState } from 'state/type';

// import { applyCost } from 'costs/reducer';

import * as constants from 'state/constants/kungfu';
import { addKungFuTechnique, openStyle } from 'state/kungfu';

export function kungfuReducer(baseState: IStoreState, action: IKungFuAction): IStoreState {
  switch (action.type) {
      case constants.KUNGFU_OPEN_STYLE:
        return produce(baseState, draftState => {
          // applyCost(state, action.cost);
          openStyle(draftState.kungfu, action.kungfuType, action.uid);
          draftState.history.push(action);
        });
      case constants.KUNGFU_BUY_TECHNIQUE:
        return produce(baseState, draftState => {
          // applyCost(state, action.cost);
          addKungFuTechnique(draftState.kungfu, action.kungfuType, action.styleUid, action.uid);
          draftState.history.push(action);
        });
      case constants.KUNGFU_CUSTOM_NAME_FOR_STYLE:
      case constants.KUNGFU_CUSTOM_NAME_FOR_TECHNIQUE:
    default:
  }
  return baseState;
}

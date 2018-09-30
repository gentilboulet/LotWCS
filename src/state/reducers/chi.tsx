import { produce } from 'immer';

import { IChiAction } from 'state/actions/chi';
import { IStoreState } from 'state/type';

import * as constants from 'state/constants/chi';

import { increase } from 'state/chi';

export function chiReducer(baseState: IStoreState, action: IChiAction): IStoreState {
  switch (action.type) {
    case constants.CHI_BUY:
      return produce(baseState, draftState => {
        // applyCost(state, action.cost);
        increase(draftState.chi, action.chi, action.value);
        draftState.history.push(action);
      });
    default:
  }
  return baseState;
}

import { IChiAction } from 'state/actions/chi';
import { IStoreState } from 'state/types';
import * as constants from 'constants/chi';
import * as chi from 'state/chi';

// Sub Reducers
import { applyCost } from 'costs/reducer';
import { pushToHistory } from 'state/history';

export function chiReducer(oldState: IStoreState, action: IChiAction): IStoreState {
  switch (action.type) {
    case constants.CHI_BUY:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        chi.increaseValue(state, action.chiType, action.value);

        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

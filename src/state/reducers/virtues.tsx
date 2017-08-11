import { IVirtueAction } from 'state/actions/virtues';
import * as constants from 'constants/virtues';
import { IStoreState } from 'state/types';

import * as virtues from 'state/virtues';
import { pushToHistory } from 'state/history';

export function virtuesReducer(oldState: IStoreState, action: IVirtueAction): IStoreState {
  switch (action.type) {
    case constants.VIRTUE_INCREASE:
      return oldState.withMutations(state => {
        if (virtues.getVirtueIndex(state, name) === -1) {
          virtues.addVirtue(state, action.name, action.virtueType);
        }
        virtues.increaseVirtue(state, action.name, action.value);
        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

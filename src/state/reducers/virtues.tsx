import produce from "immer"

import { IVirtueAction } from 'state/actions/virtues';
import * as constants from 'state/constants/virtues';
import { IStoreState } from 'state/type';

import { add, increase } from 'state/virtues';

export function virtuesReducer(baseState: IStoreState, action: IVirtueAction): IStoreState {
  switch (action.type) {
    case constants.VIRTUE_INCREASE:
    return produce(baseState, state => {
      add(state.virtues, action.name, action.virtueType);
      increase(state.virtues, action.name, action.value);
      state.history.push(action);
    });
    default:
  }
  return baseState;
}

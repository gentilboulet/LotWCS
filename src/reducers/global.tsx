import { IAction } from '../types/actions';
import { IStoreState } from '../types/state';

import * as header from '../constants/header';
import * as initial from '../constants/initial';
import { headerReducer } from '../reducers/header';
import { initialStateFactory } from '../reducers/initial';

export function globalReducer(state: IStoreState, action: IAction): IStoreState {
  switch (action.type) {
    case header.HEADER_SET_ARCHETYPE:
    case header.HEADER_SET_CONCEPT:
    case header.HEADER_SET_NAME:
    case header.HEADER_SET_RANK:
      return headerReducer(state, action);
    case initial.INITIAL_STATE:
      return initialStateFactory();
    default:
      return state;
  }
}

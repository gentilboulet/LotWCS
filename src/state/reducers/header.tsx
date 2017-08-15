import { IHeaderAction } from 'state/actions/header';
import * as constants from 'state/constants/header';
import * as header from 'state/header';
import { IStoreState } from 'state/types';

import { pushToHistory } from 'state/history';

export function headerReducer(oldState: IStoreState, action: IHeaderAction): IStoreState {
  switch (action.type) {
    case constants.HEADER_SET_NAME:
      return oldState.withMutations(state => {
        header.setName(state, action.name);
        pushToHistory(state, action);
      });
    case constants.HEADER_SET_CONCEPT:
      return oldState.withMutations(state => {
        header.setConcept(state, action.concept);
        pushToHistory(state, action);
      });
    case constants.HEADER_SET_RANK:
      return oldState.withMutations(state => {
        header.setRank(state, action.rank);
        pushToHistory(state, action);
      });
    case constants.HEADER_SET_ARCHETYPE:
      return oldState.withMutations(state => {
        header.setArchetype(state, action.archetype);
        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

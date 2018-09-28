import { produce } from 'immer';

import { IHeaderAction } from 'state/actions/header';
import * as constants from 'state/constants/header';
import { setRank } from 'state/header';
import { IStoreState } from 'state/type';

export function headerReducer(baseState: IStoreState, action: IHeaderAction): IStoreState {
  switch (action.type) {
    case constants.HEADER_SET_NAME:
      return produce(baseState, draftState => {
        draftState.name = action.name;
        draftState.history.push(action);
      });
    case constants.HEADER_SET_CONCEPT:
      return produce(baseState, draftState => {
        draftState.concept = action.concept;
        draftState.history.push(action);
      });
    case constants.HEADER_SET_RANK:
      return produce(baseState, draftState => {
        setRank(draftState, action.rank);
        draftState.history.push(action);
      });
    case constants.HEADER_SET_ARCHETYPE:
      return produce(baseState, draftState => {
        draftState.archetype = action.archetype;
        draftState.history.push(action);
      });
    default:
  }
  return baseState;
}

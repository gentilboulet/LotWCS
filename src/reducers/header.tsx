import { IHeaderAction } from '../actions/header';
import { IStoreState } from '../types/state';
import * as constants from '../constants/header';
import { pushToHistory } from './history';

export function headerReducer(state: IStoreState, action: IHeaderAction): IStoreState {
  switch (action.type) {
    case constants.HEADER_SET_NAME:
      return pushToHistory(state.set('name', action.name ), action);
    case constants.HEADER_SET_CONCEPT:
      return pushToHistory(state.set('concept', action.concept ), action);
    case constants.HEADER_SET_RANK:
      return pushToHistory(state.set('rank', action.rank ).set('rankModified', true), action);
    case constants.HEADER_SET_ARCHETYPE:
      return pushToHistory(state.set('archetype', action.archetype ).set('archetypeModified', true), action);
    default:
  }
  return state;
}

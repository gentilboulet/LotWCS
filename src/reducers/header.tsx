import { IHeaderAction } from '../actions/header';
import { IStoreState } from '../types';
import * as constants from '../constants/header';

/* tslint:disable:no-console */

export function headerReducer(state: IStoreState, action: IHeaderAction): IStoreState {
  console.log('headerReducer for ' + action.type);
  switch (action.type) {
    case constants.HEADER_SET_NAME:
      return state.set('name', action.name );
    case constants.HEADER_SET_CONCEPT:
      return state.set('concept', action.concept );
    case constants.HEADER_SET_RANK:
      return state.set('rank', action.rank ).set('rankModified', true);
    case constants.HEADER_SET_ARCHETYPE:
      return state.set('archetype', action.archetype ).set('archetypeModified', true);
    default:
  }
  return state;
}

import { HeaderAction } from '../actions/header';
import { StoreState } from '../types/index';
import { HEADER_SET_NAME, HEADER_SET_CONCEPT } from '../constants/header';

export function headerReducer(state: StoreState, action: HeaderAction): StoreState {
  switch (action.type) {
    case HEADER_SET_NAME:
      return state.set('name', action.name );
    case HEADER_SET_CONCEPT:
      return state.set('concept', action.concept );
    default:
  }
  return state;
}

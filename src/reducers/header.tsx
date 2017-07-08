import { IHeaderAction } from '../actions/header';
import { IStoreState } from '../types/state';
import * as constants from '../constants/header';

// Sub Reducers
import { IBonus } from '../types/bonuses';
import { IReduction} from '../types/reductions';
import { applyBonuses } from './bonuses';
import { pushToReductions } from './reductions';
import { pushToHistory } from './history';

export function headerReducer(oldState: IStoreState, action: IHeaderAction): IStoreState {
  switch (action.type) {
    case constants.HEADER_SET_NAME:
      return oldState.withMutations(state => {
        state.set('name', action.name);
        pushToHistory(state, action);
      });
    case constants.HEADER_SET_CONCEPT:
      return oldState.withMutations(state => {
        state.set('concept', action.concept);
        pushToHistory(state, action);
      });
    case constants.HEADER_SET_RANK:
      return oldState.withMutations(state => {
        state.set('rank', action.rank );
        state.set('rankModified', true);
        state.set('rankValue', action.value);
        applyBonuses(state, action.perks as IBonus[]);
        pushToReductions(state, action.perks as IReduction[]);
        pushToHistory(state, action);
      });
    case constants.HEADER_SET_ARCHETYPE:
      return oldState.withMutations(state => {
        state.set('archetype', action.archetype );
        state.set('archetypeModified', true);
        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

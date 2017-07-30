import { IHeaderAction } from '../actions/header';
import * as constants from '../constants/header';
import { ranks as dataRanks } from '../data/ranks';
import { IStoreState } from '../types/state';

// Sub Reducers
import { IBonus } from '../types/bonuses';
import { IDiscount } from '../types/discounts';

import { applyBonuses } from './bonuses';
import { pushToDiscounts } from './discounts';
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

        const idx = dataRanks.findIndex((data) => (data.key === action.rank));

        applyBonuses(state, dataRanks[idx].perks as IBonus[]);
        pushToDiscounts(state, dataRanks[idx].perks as IDiscount[]);
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

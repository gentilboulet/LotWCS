import { IHeaderAction } from 'state/actions/header';
import * as constants from 'constants/header';
import * as dataRanks from 'data/ranks';
import { IStoreState } from 'state/types';

// Sub Reducers
import { IBonus } from 'perks/types/bonuses';
import { IDiscount } from 'perks/types/discounts';

import { applyBonuses } from 'perks/reducers/bonuses';
import { pushToDiscounts } from 'perks/reducers/discounts';
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

        const idx = dataRanks.ranks.findIndex((data) => (data.key === action.rank));
        state.set('rankValue', dataRanks.ranks[idx].value);

        applyBonuses(state, dataRanks.ranks[idx].perks as IBonus[]);
        pushToDiscounts(state, dataRanks.ranks[idx].perks as IDiscount[]);
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

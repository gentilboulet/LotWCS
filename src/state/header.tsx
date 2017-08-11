import * as dataRanks from 'data/ranks';
import { IStoreState } from 'state/types';

// Sub Reducers
import { IBonus } from 'perks/types/bonuses';
import { IDiscount } from 'perks/types/discounts';

import { applyBonuses } from 'perks/reducers/bonuses';
import { pushToDiscounts } from 'perks/reducers/discounts';

export function setName(state: IStoreState, name: string): void {
  state.set('name', name);
}

export function setConcept(state: IStoreState, concept: string): void {
  state.set('concept', concept);
}

export function setRank(state: IStoreState, rank: string): void {
  state.set('rank', rank );
  state.set('rankModified', true);

  const idx = dataRanks.ranks.findIndex((data) => (data.key === rank));
  state.set('rankValue', dataRanks.ranks[idx].value);

  applyBonuses(state, dataRanks.ranks[idx].perks as IBonus[]);
  pushToDiscounts(state, dataRanks.ranks[idx].perks as IDiscount[]);
}

export function setArchetype(state: IStoreState, archetype: string): void {
  state.set('archetype', archetype );
  state.set('archetypeModified', true);
}

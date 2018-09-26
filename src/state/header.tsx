import { ranks } from 'data/ranks';
import { IStoreState } from 'state/type';

// Sub Reducers
// import { IBonus } from 'perks/types/bonuses';
// import { IDiscount } from 'perks/types/discounts';

// import { applyBonuses } from 'perks/reducers/bonuses';
// import { pushToDiscounts } from 'perks/reducers/discounts';

export function setRank(state: IStoreState, rank: string): void {
  const idx = ranks.findIndex((data) => (data.key === rank));
  state.rank = { name: rank, value: ranks[idx].value };
  // applyBonuses(state, dataRanks.ranks[idx].perks as IBonus[]);
  // pushToDiscounts(state, dataRanks.ranks[idx].perks as IDiscount[]);
}

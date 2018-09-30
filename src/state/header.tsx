import { ranks } from 'data/ranks';
import { IStoreState } from 'state/type';

// Sub Reducers
import { applyBonuses, IBonus, isBonus } from 'state/bonuses';
import { IDiscount, isDiscount, pushToDiscounts } from 'state/discounts';

export function setRank(state: IStoreState, rank: string): void {
  const idx = ranks.findIndex((data) => (data.key === rank));
  state.rank = { name: rank, value: ranks[idx].value };
  applyBonuses(state, ranks[idx].perks.filter(p => isBonus(p)) as IBonus[]);
  pushToDiscounts(state, ranks[idx].perks.filter(p => isDiscount(p)) as IDiscount[]);
}

import { getRank } from "../data/ranks";
import { IStoreState } from "./type";

// Sub Reducers
import { applyBonuses, IBonus, isBonus } from "./bonuses";
import { IDiscount, isDiscount, pushToDiscounts } from "./discounts";

export function setRank(state: IStoreState, rankKey: string): void {
  const dataRank = getRank(rankKey);
  state.rank = { name: dataRank.name, value: dataRank.value };
  applyBonuses(state, dataRank.perks.filter(p => isBonus(p)) as IBonus[]);
  pushToDiscounts(state, dataRank.perks.filter(p =>
    isDiscount(p)
  ) as IDiscount[]);
}

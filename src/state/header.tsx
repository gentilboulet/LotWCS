import * as data from "../data/ranks";
import { IStoreState } from "./type";

// Sub Reducers
import { IBonus, isBonus } from "../perks/bonuses";
import { IDiscount, isDiscount } from "../perks/discounts";
import { applyBonuses } from "./bonuses";
import { pushToDiscounts } from "./discounts";

export function setRank(state: IStoreState, rank: data.TRank): void {
  const dataRank = data.getRank(rank) as data.IDataRank;
  state.rank = dataRank.value;
  applyBonuses(state, dataRank.perks.filter(p => isBonus(p)) as IBonus[]);
  pushToDiscounts(state, dataRank.perks.filter(p =>
    isDiscount(p)
  ) as IDiscount[]);
}

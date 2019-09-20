/* tslint:disable:max-line-length */
import { bonusChi, bonusDestiny } from "../perks/actions/bonuses";
import { discountSkillFactory } from "../perks/actions/discounts";

import { IBonus } from "../perks/bonuses";
import { IDiscount } from "../perks/discounts";

export type TRank = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface IDataRank {
  name: string;
  description: string;
  value: TRank;
  perks: Array<IBonus | IDiscount>;
}

export interface IDataRanks extends Array<IDataRank> {}

export const ranks: IDataRanks = [
  {
    description:
      "River size and Joss limit are 1, no Aura or Chi replenishment, Lake is 5, maximum skill bonus is +5.",
    name: "Unranked",
    perks: [bonusDestiny(10), discountSkillFactory(10), bonusChi(8, "general")],
    value: 0
  },
  {
    description:
      "River size, Joss, Chi replenishment and Chi Aura limit are 1. Lake size is 6. Maximum skill bonus is +5.",
    name: "5th Rank",
    perks: [bonusDestiny(15), discountSkillFactory(10), bonusChi(8, "general")],
    value: 1
  },
  {
    description:
      "River size, Joss, Chi replenishment and Chi Aura limit are 2. Lake size is 7. Maximum skill bonus is +10.",
    name: "4th Rank",
    perks: [
      bonusDestiny(20),
      discountSkillFactory(20),
      bonusChi(10, "general")
    ],
    value: 2
  },
  {
    description:
      "River size, Joss, Chi replenishment and Chi Aura limit are 3. Lake size is 8. Maximum skill bonus is +15.",
    name: "3rd Rank",
    perks: [
      bonusDestiny(50),
      discountSkillFactory(20),
      bonusChi(10, "general")
    ],
    value: 3
  },
  {
    description:
      "River size, Joss, Chi replenishment and Chi Aura limit are 4. Lake size is 9. Maximum skill bonus is +20.",
    name: "2nd Rank",
    perks: [
      bonusDestiny(100),
      discountSkillFactory(20),
      bonusChi(10, "general")
    ],
    value: 4
  },
  {
    description:
      "River size, Joss, Chi replenishment and Chi Aura limit are 5. Lake size is 10. Maximum skill bonus is +25.",
    name: "1st Rank",
    perks: [
      bonusDestiny(150),
      discountSkillFactory(20),
      bonusChi(10, "general")
    ],
    value: 5
  }
];

export function validateRank(rank: number): void {
  const foundRank = ranks.find(
    (dataRank: IDataRank) => (dataRank.value as number) === rank
  );
  if (!foundRank) {
    throw new Error('Invalid rank "' + rank + '"');
  }
}

export function getRank(rank: any) {
  return ranks.find((dataRank: IDataRank) => dataRank.value === rank);
}

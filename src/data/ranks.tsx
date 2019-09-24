/* tslint:disable:max-line-length */
import { KUNGFU_EXTERNAL, KUNGFU_INTERNAL } from "../data/kungfu/types";
import { VIRTUE_CHIVALROUS, VIRTUE_SELFISH } from "../data/virtues";

import { bonusChi, bonusDestiny } from "../perks/actions/bonuses";
import {
  discountKungfuFactory,
  discountSkillFactory,
  discountVirtueFactory
} from "../perks/actions/discounts";

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

function _defaultVirtues() {
  const virtues: Array<{
    name: string;
    type: VIRTUE_SELFISH | VIRTUE_CHIVALROUS;
  }> = [
    // TODO : handle virtues more clearly
    { name: "Honor", type: VIRTUE_CHIVALROUS },
    { name: "Benevolence", type: VIRTUE_CHIVALROUS },
    { name: "Righteousness", type: VIRTUE_CHIVALROUS },
    { name: "Loyalty", type: VIRTUE_CHIVALROUS },
    { name: "Force", type: VIRTUE_CHIVALROUS },
    { name: "Revenge", type: VIRTUE_SELFISH },
    { name: "Individualism", type: VIRTUE_SELFISH },
    { name: "Obsession", type: VIRTUE_SELFISH },
    { name: "Ruthlessness", type: VIRTUE_SELFISH },
    { name: "Ferocity", type: VIRTUE_SELFISH }
  ];
  return discountVirtueFactory(15 * 5, virtues); // 15 free points
}

export const ranks: IDataRanks = [
  {
    description:
      "River size and Joss limit are 1, no Aura or Chi replenishment, Lake is 5, maximum skill bonus is +5.",
    name: "Unranked",
    perks: [
      bonusDestiny(10),
      discountSkillFactory(10),
      bonusChi(8, "general"),
      _defaultVirtues()
    ],
    value: 0
  },
  {
    description:
      "River size, Joss, Chi replenishment and Chi Aura limit are 1. Lake size is 6. Maximum skill bonus is +5.",
    name: "5th Rank",
    perks: [
      bonusDestiny(15),
      discountSkillFactory(10),
      bonusChi(8, "general"),
      _defaultVirtues()
    ],
    value: 1
  },
  {
    description:
      "River size, Joss, Chi replenishment and Chi Aura limit are 2. Lake size is 7. Maximum skill bonus is +10.",
    name: "4th Rank",
    perks: [
      bonusDestiny(20),
      discountSkillFactory(20),
      bonusChi(10, "general"),
      discountKungfuFactory(10, KUNGFU_EXTERNAL),
      discountKungfuFactory(10, KUNGFU_INTERNAL),
      _defaultVirtues()
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
      bonusChi(10, "general"),
      discountKungfuFactory(10, KUNGFU_EXTERNAL),
      discountKungfuFactory(10, KUNGFU_INTERNAL),
      _defaultVirtues()
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
      bonusChi(10, "general"),
      discountKungfuFactory(10, KUNGFU_EXTERNAL),
      discountKungfuFactory(10, KUNGFU_INTERNAL),
      _defaultVirtues()
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
      bonusChi(10, "general"),
      _defaultVirtues()
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

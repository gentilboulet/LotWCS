export type ARMOR_TYPE = "Light Armor" | "Medium Armor" | "Heavy Armor";

import {
  combatStatistic,
  increaseBaseChiForThreshold,
  skill
} from "../perks/actions/effects";
import { IEffect } from "../perks/effects";

export interface IDataArmorType {
  type: ARMOR_TYPE;
  effects: IEffect[];
  cost: number;
}

export const armor: IDataArmorType[] = [
  {
    type: "Light Armor",
    effects: [increaseBaseChiForThreshold(5)],
    cost: 0
  },
  {
    type: "Medium Armor",
    effects: [
      increaseBaseChiForThreshold(10),
      skill("Finesse", -5),
      skill("Stealth", -5),
      combatStatistic("speed", -5),
      combatStatistic("footwork", -5)
    ],
    cost: 1
  },
  {
    type: "Heavy Armor",
    effects: [
      increaseBaseChiForThreshold(15),
      skill("Finesse", -10),
      skill("Stealth", -10),
      combatStatistic("speed", -10),
      combatStatistic("footwork", -10)
    ],
    cost: 2
  }
];

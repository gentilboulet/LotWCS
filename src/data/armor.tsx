import {
  combatStatistic,
  increaseBaseChiForThreshold,
  skill,
} from "../perks/actions/effects";
import { IEffect } from "../perks/effects";

export type ARMOR_TYPE = "Light Armor" | "Medium Armor" | "Heavy Armor";
export interface IDataArmorType {
  type: ARMOR_TYPE;
  effects: IEffect[];
  cost: number;
}

export const armors: IDataArmorType[] = [
  {
    type: "Light Armor",
    effects: [increaseBaseChiForThreshold(5)],
    cost: 0,
  },
  {
    type: "Medium Armor",
    effects: [
      increaseBaseChiForThreshold(10),
      skill("Finesse", -5),
      skill("Stealth", -5),
      combatStatistic("speed", -5),
      combatStatistic("footwork", -5),
    ],
    cost: 1,
  },
  {
    type: "Heavy Armor",
    effects: [
      increaseBaseChiForThreshold(15),
      skill("Finesse", -10),
      skill("Stealth", -10),
      combatStatistic("speed", -10),
      combatStatistic("footwork", -10),
    ],
    cost: 2,
  },
];

export function getEffects(armor: ARMOR_TYPE): IEffect[] {
  const data = armors.find(a => a.type === armor) as IDataArmorType;
  return data.effects;
}

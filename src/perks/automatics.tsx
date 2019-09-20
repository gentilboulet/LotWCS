import { TSkillName } from "../data/skills";
import { IBonus } from "../perks/bonuses";
import { IDiscount } from "../perks/discounts";
import * as constants from "./constants/automatics";

export type autoPerks = IBonus | IDiscount;
export interface IAutomaticArchetypeCondition {
  type: constants.AUTO_CONDITION_ARCHETYPE;
  archetype: string;
  perks: autoPerks[];
}

export interface IAutomaticSkillCondition {
  type: constants.AUTO_CONDITION_SKILL;
  skill: TSkillName;
  value: number;
  perks: autoPerks[];
}

export type IAutomaticCondition =
  | IAutomaticArchetypeCondition
  | IAutomaticSkillCondition;

export function isAutomaticCondition(r: any): boolean {
  if (r && "type" in r) {
    switch (r.type) {
      case constants.AUTO_CONDITION_SKILL:
      case constants.AUTO_CONDITION_ARCHETYPE:
        return true;
    }
  }
  return false;
}

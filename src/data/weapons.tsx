import {
  combatStatistic,
  conditionalOnelineText,
} from "../perks/actions/effects";
import { IEffect } from "../perks/effects";

export type WEAPON_TYPE =
  | "Flexible"
  | "Massive"
  | "Paired"
  | "Ranged"
  | "Saber"
  | "Staff"
  | "Spear"
  | "Sword"
  | "Unarmed";

export interface IDataWeaponType {
  type: WEAPON_TYPE;
  effects: IEffect[];
}

export const weapons: IDataWeaponType[] = [
  {
    type: "Flexible",
    effects: [
      combatStatistic("strike", 5),
      conditionalOnelineText(
        "If an attack with a Flexible weapon is described in such a way that it is best Blocked instead of Dodged, the penalty to Dodge is -10 instead of -5.",
      ),
      conditionalOnelineText(
        "You may Flood one die from the River to extend an attack into an adjacent zone.",
      ),
    ],
  },
  {
    type: "Massive",
    effects: [
      combatStatistic("damage", 5),
      conditionalOnelineText(
        "If an attack with a Massive weapon is described in such a way that it is best Dodged instead of Blocked, the penalty to Block is -10 instead of -5.",
      ),
      conditionalOnelineText(
        "You may Flood one die from the River while you { make } the attack to ignore the target’s armor on any resulting Rippling roll.",
      ),
    ],
  },
  {
    type: "Paired",
    effects: [
      combatStatistic("strike", 5),
      conditionalOnelineText(
        "If you Block an attack against an opponent in the same Zone by 10 or more, you may Reply against that opponent.",
      ),
      conditionalOnelineText(
        "// • You can Flood a die or set of dice from the River as the basis for a Secondary Attack.",
      ),
    ],
  },
  {
    type: "Ranged",
    effects: [
      combatStatistic("strike", 5),
      conditionalOnelineText(
        "You can make attacks against targets in adjacent Zones.",
      ),
      conditionalOnelineText(
        "You may Flood one die from the River to make an attack against targets further away, up to the limit that the Sage feels is reasonable.",
      ),
    ],
  },
  {
    type: "Saber",
    effects: [
      combatStatistic("strike", 5),
      combatStatistic("damage", 5),
      conditionalOnelineText(
        "You may Flood one die from the River to force an immediate Rippling check if the { Strike } exceeds the defense by 5 or more, instead of 10. You may do { this } after the defender rolls. (This doesn’t apply to other attack forms, such as Secret Arts or energy attacks.)",
      ),
    ],
  },
  {
    type: "Staff",
    effects: [
      combatStatistic("strike", 5),
      combatStatistic("block", 5),
      conditionalOnelineText(
        "You can Flood a die or set of dice from the River as the basis for a Secondary Attack.",
      ),
    ],
  },
  {
    type: "Spear",
    effects: [
      combatStatistic("damage", 5),
      conditionalOnelineText(
        " You may Flood one die from the River to extend an attack into an adjacent zone.",
      ),
      conditionalOnelineText(
        "You may Flood one die from the River while you { make } a Block. If you do {, you } may exploit your weapon’s superior reach. For this defense you Laugh at your opponent and do { not } Fear him, unless he can claim a similar long reach (such as from using a spear or a ranged weapon).",
      ),
    ],
  },
  {
    type: "Sword",
    effects: [
      combatStatistic("strike", 5),
      combatStatistic("block", 5),
      conditionalOnelineText(
        "You may Flood one die from the River while you { make } the attack. If you do { and } cause a Rippling roll, any Chi Aura used to protect against this damage costs 2 Chi points per die to purchase.",
      ),
    ],
  },
  {
    type: "Unarmed",
    effects: [
      combatStatistic("speed", 5),
      combatStatistic("footwork", 5),
      conditionalOnelineText(
        "You can Focus on Breath using only a single die from your initiative roll, instead of needing a set.",
      ),
    ],
  },
];

export function getEffects(weapon: WEAPON_TYPE): IEffect[] {
  const data = weapons.find(w => w.type === weapon) as IDataWeaponType;
  return data.effects;
}
// TODO : DO NOT STACK !!!

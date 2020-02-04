import * as effects from "../../../perks/actions/effects";
import { IDataExternalKungfu } from "../types";

/* tslint:disable:max-line-length */
/* tslint:disable:object-literal-sort-keys */

export const boneFedWolfFang: IDataExternalKungfu = {
  name: "Bone-Fed Wolf Fang",
  uid: "Bone-Fed Wolf Fang",
  weapons: ["Massive", "Saber"],
  qualities: [
    "Generations of battlefield experience have shaped a fighting style developed with the practicalities of warfare in mind. Some maneuvers were loosely inspired by the gruesome methods by which wolves drag down their prey. It is mainly taught by the military, but unfortunately, many deserters take up a life of banditry, making this style a common plague for simple people. Because of this, the style is also often called a dog’s way of fighting.",
    "This style focuses on hard, linear movements designed to cripple and exploit weaknesses–the supreme soldier needs efficiency, not beauty. It cruelly maims first, and dispatches second. No methods are too dishonest when victory is on the line.",
  ],
  laugths:
    "The wolf laughs at honesty, which it rewards with hungry teeth. Above all else, the wolf knows no greater joy than to fight someone vulnerable or caught off guard.",
  fears:
    "The wolf fears what is hidden or unorthodox, for his many strategies don’t account for them. The wolf also dislikes being outnumbered and surrounded; it relies on being the hunting pack, not the hunted.",
  statistics: {
    speed: +5,
    footwork: +5,
    strike: +5,
    damage: +10,
    block: +5,
    toughness: +5,
  },
  techniques: [
    {
      name: "Circling Pack",
      cost: 4,
      description:
        "Wolves strike from all sides to overwhelm their prey. You force a response with your weapon, creating an opening so you can deal a blow to a vulnerable spot.",
      effect: effects.conditionalOnelineText(
        "The difficulty to recover from Disrupt or Disorient Marvels you have imposed is increased by 10.",
      ),
      uid: "Circling Pack",
    },
    {
      name: "Fighting With Fire",
      cost: 4,
      description:
        "Fire is a useful, if dangerous, tool to use in war. Its effects on the enemy are startling: set something ablaze that they value and they will flock towards it; set something ablaze that they can afford to lose and they won’t dare approach. So too must your strikes be utilized to force them into a pattern and method of your choosing. An enemy that follows your lead is not worthy of the name",
      effect: effects.conditionalOnelineText(
        "This style’s Block and Dodge bonuses increase to +10 against any Disoriented or Disrupted target",
      ),
      uid: "Fighting With Fire",
    },
    {
      name: "March Towards Hell",
      cost: 4,
      description:
        "The wise general makes his enemies tire themselves out by forcing them to march towards his position. Once in battle, he cleverly uses his troops to dictate the maneuvers of his enemy. Your attacks follow the same philosophy; your enemies are already defeated, the slaughter a mere formality.",
      effect: effects.conditionalOnelineText(
        "You may Flood 1 die from the River while you make an attack. If you do, the strike also creates a Disorient or Disrupt condition if it hits.",
      ),
      uid: "March Towards Hell",
    },
    {
      name: "Rainfall at Night",
      cost: 4,
      description:
        "The battlefield is where wars are ended, but to a peerless general their outcome is determined beforehand. Assassinate their officers, poison the wells, fill their hearts with propaganda, and creep inside their camps to set fires and steal horses. These are the ways of the warrior who knows neither honor nor defeat.",
      effect: effects.conditionalOnelineText(
        "This style’s Strike bonus increases to +10 against any Disoriented or Disrupted target.",
      ),
      uid: "Rainfall at Night",
    },
    {
      name: "Wolves Devour the Lion",
      cost: 4,
      description:
        "Stress bruised ribs until they crack. Lash sore flesh until it rips. The tales of glorious battle are for the halls of gold and silk, but they are built on your acts in the fields of iron and wolves.",
      effect: effects.conditionalOnelineText(
        "This style’s Damage bonus increases to +15 against any Disoriented or Disrupted target.",
      ),
      uid: "Wolves Devour the Lion",
    },
  ],
};

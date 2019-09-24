import { TSkillName } from "../data/skills";
import * as constants from "./constants/effects";

export type IEffectStatistic =
  | "speed"
  | "footwork"
  | "strike"
  | "damage"
  | "block"
  | "toughness";

export interface IEffectCombatStatistic {
  type: constants.EFFECT_COMBAT_STATISTIC;
  increase: number;
  statistic: IEffectStatistic;
}

export interface IEffectSkillModifier {
  type: constants.EFFECT_SKILL;
  skill: TSkillName;
  value: number;
}

export interface IEffectConditionalText {
  type: constants.EFFECT_CONDITIONAL_TEXT;
  text: string[];
}

export interface IEffectChiThresholdIncreaseBaseChi {
  type: constants.EFFECT_CHI_THRESHOLD_INCREASE_BASE_CHI;
  chiIncrease: number;
}

export type IEffect =
  | IEffectCombatStatistic
  | IEffectConditionalText
  | IEffectChiThresholdIncreaseBaseChi
  | IEffectSkillModifier;

export function effectToString(effect: IEffect): string {
  const boost = (value: number, statistic: string) =>
    (value > 0 ? "+" : "") + value + " to " + statistic;
  switch (effect.type) {
    case constants.EFFECT_COMBAT_STATISTIC:
      return boost(effect.increase, effect.statistic);
    case constants.EFFECT_CONDITIONAL_TEXT:
      return effect.text.toString();
    case constants.EFFECT_CHI_THRESHOLD_INCREASE_BASE_CHI:
      return (
        (effect.chiIncrease > 0 ? "+" : "") +
        effect.chiIncrease +
        " to Chi Threshold"
      );
    case constants.EFFECT_SKILL:
      return boost(effect.value, effect.skill);
  }
}

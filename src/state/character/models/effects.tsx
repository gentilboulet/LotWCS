import * as constants from "../perks/constants/effects";

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
  | IEffectChiThresholdIncreaseBaseChi;

export function effectToString(effect: IEffect): string {
  switch (effect.type) {
    case constants.EFFECT_COMBAT_STATISTIC:
      return (
        (effect.increase > 0 ? "+" : "") +
        effect.increase +
        " to " +
        effect.statistic
      );
    case constants.EFFECT_CONDITIONAL_TEXT:
      return effect.text.toString();
    case constants.EFFECT_CHI_THRESHOLD_INCREASE_BASE_CHI:
      return (
        (effect.chiIncrease > 0 ? "+" : "") +
        effect.chiIncrease +
        " to Chi Threshold"
      );
  }
}

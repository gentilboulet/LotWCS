import * as constants from "../constants/effects";
import {
  IEffectChiThresholdIncreaseBaseChi,
  IEffectCombatStatistic,
  IEffectConditionalText,
  IEffectSkillModifier,
  IEffectStatistic,
} from "../effects";

import { TSkillName } from "../../data/skills";

export function combatStatistic(
  statistic: IEffectStatistic,
  increase: number,
): IEffectCombatStatistic {
  return { increase, statistic, type: constants.EFFECT_COMBAT_STATISTIC };
}

export function conditionalText(textInput: string[]): IEffectConditionalText {
  const text = textInput.filter((line: string) => line.length > 0);
  if (text.length === 0) {
    throw new Error("Error with conditionalText : empty text");
  }
  return { text, type: constants.EFFECT_CONDITIONAL_TEXT };
}

export function conditionalOnelineText(text: string): IEffectConditionalText {
  return conditionalText(new Array<string>(text));
}

export function increaseBaseChiForThreshold(
  chiIncrease: number,
): IEffectChiThresholdIncreaseBaseChi {
  return {
    chiIncrease,
    type: constants.EFFECT_CHI_THRESHOLD_INCREASE_BASE_CHI,
  };
}

export function skill(name: TSkillName, value: number): IEffectSkillModifier {
  return { type: constants.EFFECT_SKILL, skill: name, value };
}

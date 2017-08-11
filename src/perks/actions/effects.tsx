import { IEffectStatistic, IEffectChiThresholdIncreaseBaseChi,
  IEffectCombatStatistic, IEffectConditionalText } from 'perks/types/effects';
import * as constants from 'perks/constants/effects';

export function combatStatistic(statistic: IEffectStatistic, increase: number): IEffectCombatStatistic {
  return { increase, statistic, type: constants.EFFECT_COMBAT_STATISTIC };
}

export function conditionalText(textInput: string[]): IEffectConditionalText {
  const text = textInput.filter((line: string) => (line.length > 0));
  if (text.length === 0) { throw new Error('Error with conditionalText : empty text'); }
  return { text, type: constants.EFFECT_CONDITIONAL_TEXT };
}

export function conditionalOnelineText(text: string): IEffectConditionalText {
  return conditionalText(new Array<string>(text));
}

export function increaseBaseChiForThreshold(chiIncrease: number): IEffectChiThresholdIncreaseBaseChi {
  return { type: constants.EFFECT_CHI_THRESHOLD_INCREASE_BASE_CHI, chiIncrease };
}

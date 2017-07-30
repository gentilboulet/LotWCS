import { IEffectStatistic, IEffectChiThresholdIncreaseBaseChi,
  IEffectCombatStatistic, IEffectConditionalText } from '../types/effects';
import * as constants from '../constants/effects';

export function combatStatistic(statistic: IEffectStatistic, increase: number): IEffectCombatStatistic {
  return { increase, statistic, type: constants.EFFECT_COMBAT_STATISTIC };
}

export function conditionalText(text: string[]): IEffectConditionalText {
  return { text, type: constants.EFFECT_CONDITIONAL_TEXT };
}

export function conditionalOnelineText(text: string): IEffectConditionalText {
  return { text: new Array<string>(text), type: constants.EFFECT_CONDITIONAL_TEXT };
}

export function increaseBaseChiForThreshold(chiIncrease: number): IEffectChiThresholdIncreaseBaseChi {
  return { type: constants.EFFECT_CHI_THRESHOLD_INCREASE_BASE_CHI, chiIncrease };
}

import * as constants from 'state/constants/perks/effects';

export type IEffectStatistic = 'speed' | 'footwork' | 'strike' | 'damage' | 'block' | 'toughness';

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

export type IEffect = IEffectCombatStatistic | IEffectConditionalText | IEffectChiThresholdIncreaseBaseChi;

import * as constants from '../constants/kungfus';
import { ICost } from '../types/costs';

export interface IKungFuExternalOpenStyle {
  type: constants.KUNGFU_OPEN_STYLE;
  cost: ICost;
  kungfuType: constants.KUNGFU_EXTERNAL;
  styleUid: string;
}

export interface IKungFuExternalBuyTechnique {
  type: constants.KUNGFU_BUY_TECHNIQUE;
  cost: ICost;
  styleUid: string;
  kungfuType: constants.KUNGFU_EXTERNAL;
  techniqueUid: string;
}

export interface IKungFuExternalSetCustomStyleName {
  type: constants.KUNGFU_CUSTOM_NAME_FOR_STYLE;
  cost: ICost;
  kungfuType: constants.KUNGFU_EXTERNAL;
}

export interface IKungFuExternalSetCustomTechniqueName {
  type: constants.KUNGFU_CUSTOM_NAME_FOR_TECHNIQUE;
  cost: ICost;
  kungfuType: constants.KUNGFU_EXTERNAL;
}

export interface IKungFuInternalOpenStyle {
  type: constants.KUNGFU_OPEN_STYLE;
  cost: ICost;
  styleUid: string;
  kungfuType: constants.KUNGFU_INTERNAL;
}

export interface IKungFuInternalBuyTechnique {
  type: constants.KUNGFU_BUY_TECHNIQUE;
  cost: ICost;
  styleUid: string;
  techniqueUid: string;
  kungfuType: constants.KUNGFU_INTERNAL;
}

export interface IKungFuInternalSetCustomStyleName {
  type: constants.KUNGFU_CUSTOM_NAME_FOR_STYLE;
  cost: ICost;
  kungfuType: constants.KUNGFU_INTERNAL;
}

export interface IKungFuInternalSetCustomTechniqueName {
  type: constants.KUNGFU_CUSTOM_NAME_FOR_TECHNIQUE;
  cost: ICost;
  kungfuType: constants.KUNGFU_INTERNAL;
}

export type IKungFuAction =  IKungFuExternalOpenStyle | IKungFuExternalBuyTechnique
| IKungFuExternalSetCustomStyleName | IKungFuExternalSetCustomTechniqueName
| IKungFuInternalOpenStyle | IKungFuInternalBuyTechnique
| IKungFuInternalSetCustomStyleName | IKungFuInternalSetCustomTechniqueName;

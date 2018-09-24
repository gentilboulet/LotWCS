import { ICost } from 'costs/types';
import * as dataKungFu from 'data/kungfus';
import * as constants from 'state/constants/kungfus';

export interface IKungFuOpenStyle {
  type: constants.KUNGFU_OPEN_STYLE;
  cost: ICost;
  uid: string;
  kungfuType: dataKungFu.KUNGFU_TYPE;
}

export interface IKungFuBuyTechnique {
  type: constants.KUNGFU_BUY_TECHNIQUE;
  cost: ICost;
  styleUid: string;
  uid: string;
  kungfuType: dataKungFu.KUNGFU_TYPE;
}

export interface IKungFuSetCustomStyleName {
  type: constants.KUNGFU_CUSTOM_NAME_FOR_STYLE;
  uid: string;
  name: string;
  kungfuType: dataKungFu.KUNGFU_TYPE;
}

export interface IKungFuSetCustomTechniqueName {
  type: constants.KUNGFU_CUSTOM_NAME_FOR_TECHNIQUE;
  styleUid: string;
  uid: string;
  name: string;
  kungfuType: dataKungFu.KUNGFU_TYPE;
}

export type IKungFuAction = IKungFuOpenStyle | IKungFuBuyTechnique
| IKungFuSetCustomStyleName | IKungFuSetCustomTechniqueName

export function openStyle(uid: string, kungfuType: dataKungFu.KUNGFU_TYPE, cost: ICost): IKungFuOpenStyle {
  dataKungFu.validateKungFuType(kungfuType);
  dataKungFu.validateKungFuStyle(uid, kungfuType);
  return { type: constants.KUNGFU_OPEN_STYLE, cost, uid, kungfuType }
}

export function buyTechnique(
  styleUid: string, uid: string, kungfuType: dataKungFu.KUNGFU_TYPE, cost: ICost): IKungFuBuyTechnique {
  dataKungFu.validateKungFuType(kungfuType);
  dataKungFu.validateKungFuStyle(styleUid, kungfuType);
  dataKungFu.validateKungFuTechnique(styleUid, uid, kungfuType);
  return { type: constants.KUNGFU_BUY_TECHNIQUE, cost, styleUid, uid, kungfuType };
}

export function customStyleName(uid: string, kungfuType: dataKungFu.KUNGFU_TYPE, name: string): IKungFuSetCustomStyleName {
  dataKungFu.validateKungFuType(kungfuType);
  dataKungFu.validateKungFuStyle(uid, kungfuType);
  if (name.length < 1) { throw new Error ('Invalid new name'); };
  return { type: constants.KUNGFU_CUSTOM_NAME_FOR_STYLE, uid, name , kungfuType }
}

export function customTechniqueName(
  styleUid: string, uid: string, kungfuType: dataKungFu.KUNGFU_TYPE, name: string
): IKungFuSetCustomTechniqueName {
  dataKungFu.validateKungFuType(kungfuType);
  dataKungFu.validateKungFuStyle(styleUid, kungfuType);
  dataKungFu.validateKungFuTechnique(styleUid, uid, kungfuType);
  if (name.length < 1) { throw new Error ('Invalid new name'); };
  return { type: constants.KUNGFU_CUSTOM_NAME_FOR_TECHNIQUE, styleUid, uid, name , kungfuType }
}

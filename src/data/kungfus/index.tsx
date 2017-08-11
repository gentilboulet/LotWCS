import * as dataChi from 'data/chi';
import * as constants from 'constants/kungfus';
import { IEffect } from 'perks/types/effects';

export type IWeaponType = 'Flexible'|'Massive'|'Paired'|'Ranged'|'Saber'|'Staff'|'Spear'|'Sword'|'Unarmed';

export interface IDataExternalKungfuStatistics {
    speed: 0|5|10|15|20;
    footwork: 0|5|10|15|20;
    strike: 0|5|10|15|20;
    damage: 0|5|10|15|20;
    block: 0|5|10|15|20;
    toughness: 0|5|10|15|20;
}

export type IDataExternalKungfuPrerequisite = { uid: string };

export interface IDataExternalKungfuTechnique {
    name: string;
    cost: number;
    description: string;
    effect: IEffect;
    uid: string;
    prerequisites?: IDataExternalKungfuPrerequisite[];
}

export interface IDataInternalKungfuTechnique {
    name: string;
    level: number; // 1 | 2 | 3 | 4 | 5;
    description: string;
    effect: IEffect;
    uid: string;
}

export interface IDataExternalKungfu {
  name: string;
  laugths: string;
  fears: string;
  weapons: IWeaponType[];
  statistics: IDataExternalKungfuStatistics;
  techniques: IDataExternalKungfuTechnique[];
  uid: string;
}

export interface IDataInternalKungfu {
  name: string;
  element: dataChi.IChiNames;
  techniques: IDataInternalKungfuTechnique[];
  uid: string;
}

export type IDataExternalKungfus = Array<IDataExternalKungfu>;
export type IDataInternalKungfus = Array<IDataInternalKungfu>;

import { blossomHarvest } from './externals/blossom-harvest';
export const externalKungfus: IDataExternalKungfus = Array(
  blossomHarvest
);

import { boundlessProsperityManual } from './internals/boundless-prosperity-manual';
export const internalKungfus: IDataInternalKungfus = Array(
  boundlessProsperityManual
);

export function validateKungFuType(type: constants.KUNGFU_TYPE): void {
  switch(type)
  {
    case constants.KUNGFU_EXTERNAL: return;
    case constants.KUNGFU_INTERNAL: return;
    default:
      throw new Error('Invalid kung fu type : "' + type +'"');
  }
}

export function validateKungFuStyle(styleUid: string, type: constants.KUNGFU_TYPE): void {
  validateKungFuType(type);
  if (type === constants.KUNGFU_EXTERNAL) {
    const filtered = externalKungfus.filter((kf: IDataExternalKungfu) => (kf.uid === styleUid));
    if (filtered.length < 1) {
      throw new Error('Invalid external kungfu "' + styleUid + '"');
    }
  } else {
    const filtered = internalKungfus.filter((kf: IDataInternalKungfu) => (kf.uid === styleUid))
    if (filtered.length < 1) {
      throw new Error('Invalid internal kungfu "' + styleUid + '"');
    }
  }
}

export function validateKungFuTechnique(styleUid: string, techniqueUid: string, type: constants.KUNGFU_TYPE): void {
  validateKungFuStyle(styleUid, type);
  if (type === constants.KUNGFU_EXTERNAL) {
    const filtered = externalKungfus.filter((kf: IDataExternalKungfu) => {
      return kf.uid === styleUid
      && kf.techniques.filter((tech: IDataExternalKungfuTechnique) => (tech.uid === techniqueUid)).length > 0;
    });
    if (filtered.length < 1) {
      throw new Error('Invalid external kungfu technique "' + techniqueUid + '" for style "' + styleUid + '"');
    }
  } else {
    const filtered = internalKungfus.filter((kf: IDataInternalKungfu) => {
      return kf.uid === styleUid
      && kf.techniques.filter((tech: IDataInternalKungfuTechnique) => (tech.uid === techniqueUid)).length > 0;
    });
    if (filtered.length < 1) {
      throw new Error('Invalid internal kungfu technique "' + techniqueUid + '" for style "' + styleUid + '"');
    }
  }
}

// Constants used to differentiate between kungfu
export const KUNGFU_EXTERNAL = 'KUNGFU_EXTERNAL';
export type KUNGFU_EXTERNAL = typeof KUNGFU_EXTERNAL;

export const KUNGFU_INTERNAL = 'KUNGFU_INTERNAL';
export type KUNGFU_INTERNAL = typeof KUNGFU_INTERNAL;

export type KUNGFU_TYPE = KUNGFU_INTERNAL | KUNGFU_EXTERNAL;

import {
  IDataExternalKungfu,
  IDataExternalKungfuTechnique,

  IDataInternalKungfu,
  IDataInternalKungfuTechnique
} from './types'


import { blossomHarvest } from './externals/blossom-harvest';
export const externalKungfus: IDataExternalKungfu[] = Array(
  blossomHarvest
);

import { boundlessProsperityManual } from './internals/boundless-prosperity-manual';
export const internalKungfus: IDataInternalKungfu[] = Array(
  boundlessProsperityManual
);

export function validateKungFuType(type: KUNGFU_TYPE): void {
  switch (type) {
    case KUNGFU_EXTERNAL: return;
    case KUNGFU_INTERNAL: return;
    default:
      throw new Error('Invalid kung fu type : "' + type + '"');
  }
}

export function validateKungFuStyle(type: KUNGFU_TYPE, styleUid: string): void {
  validateKungFuType(type);
  if (type === KUNGFU_EXTERNAL) {
    const filtered = externalKungfus.filter((kf: IDataExternalKungfu) => (kf.uid === styleUid));
    if (filtered.length < 1) {
      throw new Error('Invalid external kungfu "' + styleUid + '"');
    }
  } else {
    const filtered = internalKungfus.filter((kf: IDataInternalKungfu) => (kf.uid === styleUid));
    if (filtered.length < 1) {
      throw new Error('Invalid internal kungfu "' + styleUid + '"');
    }
  }
}

export function validateKungFuTechnique(type: KUNGFU_TYPE, styleUid: string, techniqueUid: string): void {
  validateKungFuStyle(type, styleUid);
  if (type === KUNGFU_EXTERNAL) {
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

/* eslint-disable import/first */
import {
  IDataExternalKungfu,
  IDataExternalKungfuTechnique,
  IDataInternalKungfu,
  IDataInternalKungfuTechnique,
  KUNGFU_EXTERNAL,
  KUNGFU_INTERNAL,
  KUNGFU_TYPE,
} from "./types";

import { blossomHarvest } from "./externals/blossom-harvest";
import { boneFedWolfFang } from "./externals/bone-fed-wolf-fang";
export const externalKungfu: IDataExternalKungfu[] = [
  blossomHarvest,
  boneFedWolfFang,
];

import { boundlessProsperityManual } from "./internals/boundless-prosperity-manual";
import { fireSutra } from "./internals/fire-sutra";
export const internalKungfu: IDataInternalKungfu[] = [
  boundlessProsperityManual,
  fireSutra,
];

export function validateKungFuType(type: KUNGFU_TYPE): void {
  switch (type) {
    case KUNGFU_EXTERNAL:
      return;
    case KUNGFU_INTERNAL:
      return;
    default:
      throw new Error('Invalid kung fu type : "' + type + '"');
  }
}

export function validateKungFuStyle(type: KUNGFU_TYPE, styleUid: string): void {
  validateKungFuType(type);
  if (type === KUNGFU_EXTERNAL) {
    const filtered = externalKungfu.filter(
      (kf: IDataExternalKungfu) => kf.uid === styleUid,
    );
    if (filtered.length < 1) {
      throw new Error('Invalid external kungfu "' + styleUid + '"');
    }
  } else {
    const filtered = internalKungfu.filter(
      (kf: IDataInternalKungfu) => kf.uid === styleUid,
    );
    if (filtered.length < 1) {
      throw new Error('Invalid internal kungfu "' + styleUid + '"');
    }
  }
}

export function validateKungFuTechnique(
  type: KUNGFU_TYPE,
  styleUid: string,
  techniqueUid: string,
): void {
  validateKungFuStyle(type, styleUid);
  if (type === KUNGFU_EXTERNAL) {
    const filtered = externalKungfu.filter((kf: IDataExternalKungfu) => {
      return (
        kf.uid === styleUid &&
        kf.techniques.filter(
          (tech: IDataExternalKungfuTechnique) => tech.uid === techniqueUid,
        ).length > 0
      );
    });
    if (filtered.length < 1) {
      throw new Error(
        'Invalid external kungfu technique "' +
          techniqueUid +
          '" for style "' +
          styleUid +
          '"',
      );
    }
  } else {
    const filtered = internalKungfu.filter((kf: IDataInternalKungfu) => {
      return (
        kf.uid === styleUid &&
        kf.techniques.filter(
          (tech: IDataInternalKungfuTechnique) => tech.uid === techniqueUid,
        ).length > 0
      );
    });
    if (filtered.length < 1) {
      throw new Error(
        'Invalid internal kungfu technique "' +
          techniqueUid +
          '" for style "' +
          styleUid +
          '"',
      );
    }
  }
}

export function getKungFuType(styleUid: string): KUNGFU_TYPE {
  const externalIdx = externalKungfu.findIndex(kf => kf.uid === styleUid);
  const internalIdx = internalKungfu.findIndex(kf => kf.uid === styleUid);
  if (externalIdx !== -1) {
    return KUNGFU_EXTERNAL;
  } else if (internalIdx !== -1) {
    return KUNGFU_INTERNAL;
  } else {
    throw new Error("Unknwon kungfu " + styleUid);
  }
}

export function getKungfuChi(type: KUNGFU_TYPE, styleUid: string) {
  if (type === KUNGFU_EXTERNAL) {
    return "general";
  } else {
    return (kungfuData(KUNGFU_INTERNAL, styleUid) as IDataInternalKungfu)
      .element;
  }
}

export function kungfuData(type: KUNGFU_TYPE, styleUid: string) {
  if (type === KUNGFU_EXTERNAL) {
    const idxKF = externalKungfu.findIndex(kf => kf.uid === styleUid);
    return externalKungfu[idxKF];
  } else {
    const idxKF = internalKungfu.findIndex(kf => kf.uid === styleUid);
    return internalKungfu[idxKF];
  }
}

export function kungfuTechniqueData(
  type: KUNGFU_TYPE,
  styleUid: string,
  techUid: string,
): IDataExternalKungfuTechnique | IDataInternalKungfuTechnique {
  if (type === KUNGFU_EXTERNAL) {
    const idxKF = externalKungfu.findIndex(kf => kf.uid === styleUid);
    const idxTech = externalKungfu[idxKF].techniques.findIndex(
      t => t.uid === techUid,
    );
    return externalKungfu[idxKF].techniques[idxTech];
  } else {
    const idxKF = internalKungfu.findIndex(kf => kf.uid === styleUid);
    const idxTech = internalKungfu[idxKF].techniques.findIndex(
      t => t.uid === techUid,
    );
    return internalKungfu[idxKF].techniques[idxTech];
  }
}

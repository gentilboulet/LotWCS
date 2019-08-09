import {
  kungfuData,
  kungfuTechniqueData,
  validateKungFuStyle,
  validateKungFuTechnique
} from "../data/kungfu";
import {
  IDataExternalKungfu,
  IDataExternalKungfuStatistics,
  IDataInternalKungfuTechnique,
  KUNGFU_EXTERNAL,
  KUNGFU_INTERNAL,
  KUNGFU_TYPE
} from "../data/kungfu/types";
import * as constants from "./constants/perks/effects";
import { IStoreState } from "./type";

export interface IKungFuState {
  [KUNGFU_EXTERNAL]: { [uid: string]: string[] };
  [KUNGFU_INTERNAL]: { [uid: string]: string[] };
  noRestrictionInternal?: string[];
}

export function createState(): IKungFuState {
  return {
    KUNGFU_EXTERNAL: {},
    KUNGFU_INTERNAL: {}
  };
}

export function openStyle(
  state: IKungFuState,
  type: KUNGFU_TYPE,
  styleUid: string
): void {
  validateKungFuStyle(type, styleUid);
  state[type][styleUid] = [];
}

export function isStylePresent(
  state: IKungFuState,
  type: KUNGFU_TYPE,
  styleUid: string
): boolean {
  const styleIndex = Object.keys(state[type]).findIndex(
    stateKungFuUid => stateKungFuUid === styleUid
  );
  return styleIndex !== -1;
}

export function isStyleTechniquePresent(
  state: IKungFuState,
  type: KUNGFU_TYPE,
  styleUid: string,
  techniqueUid: string
): boolean {
  if (!isStylePresent(state, type, styleUid)) {
    return false;
  }
  const optionIndex = state[type][styleUid].findIndex(
    stateTechniqueUid => stateTechniqueUid === techniqueUid
  );
  return optionIndex !== -1;
}

export function getExternalKungFuStatistics(
  state: IKungFuState,
  styleUid: string
): IDataExternalKungfuStatistics {
  const dataStatistics = (kungfuData(
    KUNGFU_EXTERNAL,
    styleUid
  ) as IDataExternalKungfu).statistics;

  if (!isStylePresent(state, KUNGFU_EXTERNAL, styleUid)) {
    return dataStatistics;
  }

  const statistics: IDataExternalKungfuStatistics = { ...dataStatistics };

  state[KUNGFU_EXTERNAL][styleUid].forEach(techniqueUid => {
    const kfTechnique = kungfuTechniqueData(
      KUNGFU_EXTERNAL,
      styleUid,
      techniqueUid
    );
    switch (kfTechnique.effect.type) {
      case constants.EFFECT_COMBAT_STATISTIC:
        statistics[kfTechnique.effect.statistic] += kfTechnique.effect.increase;
        break;
      default:
        break;
    }
  });
  return statistics;
}

export function addKungFuTechnique(
  state: IKungFuState,
  type: KUNGFU_TYPE,
  styleUid: string,
  techniqueUid: string
): void {
  validateKungFuStyle(type, styleUid);
  validateKungFuTechnique(type, styleUid, techniqueUid);

  if (!isStylePresent(state, type, styleUid)) {
    throw new Error("Internal error : style not open");
  }
  if (isStyleTechniquePresent(state, type, styleUid, techniqueUid)) {
    throw new Error("Internal error : technique already presents");
  }

  state[type][styleUid].push(techniqueUid);
}

export function canOpenKungFu(
  state: IStoreState,
  type: KUNGFU_TYPE,
  styleUid: string
): boolean {
  return !isStylePresent(state.kungfu, type, styleUid);
}

function _knownInternalKungFuLevel(
  state: IStoreState,
  styleUid: string
): number[] {
  if (!isStylePresent(state.kungfu, KUNGFU_INTERNAL, styleUid)) {
    return [];
  }

  return state.kungfu[KUNGFU_INTERNAL][styleUid]
    .map(techniqueUid => {
      const techData = kungfuTechniqueData(
        KUNGFU_INTERNAL,
        styleUid,
        techniqueUid
      ) as IDataInternalKungfuTechnique;
      return techData.level;
    })
    .sort();
}

export function canBuyKungFuTechnique(
  state: IStoreState,
  type: KUNGFU_TYPE,
  styleUid: string,
  techniqueUid: string
): boolean {
  if (!isStylePresent(state.kungfu, type, styleUid)) {
    return false;
  }
  if (isStyleTechniquePresent(state.kungfu, type, styleUid, techniqueUid)) {
    return false;
  }

  if (type === KUNGFU_EXTERNAL) {
    return true;
  } else {
    if (state.kungfu.noRestrictionInternal) {
      if (
        -1 !==
        state.kungfu.noRestrictionInternal.findIndex(uid => uid === styleUid)
      ) {
        return true;
      }
    }
    const levels = _knownInternalKungFuLevel(state, styleUid);
    const kfTechnique = kungfuTechniqueData(
      KUNGFU_INTERNAL,
      styleUid,
      techniqueUid
    ) as IDataInternalKungfuTechnique;

    if (levels.length === 0 && kfTechnique.level === 1) {
      return true;
    }
    return Math.max(...levels) === kfTechnique.level - 1;
  }
}

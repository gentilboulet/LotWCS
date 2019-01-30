import {
  KUNGFU_EXTERNAL,
  KUNGFU_INTERNAL,
  KUNGFU_TYPE
} from "../data/kungfu/types";
import { validateKungFuStyle, validateKungFuTechnique } from "../data/kungfu";
import { IStoreState } from "./type";

export interface IKungFuState {
  [KUNGFU_EXTERNAL]: { [uid: string]: string[] };
  [KUNGFU_INTERNAL]: { [uid: string]: string[] };
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
    return false; // TODO TECH LOCKING BY LEVEL AND UNLOCK BY LS
  }
}

import {
  getLoresheetOptionData,
  IDataLoresheetOption,
  IDataLoresheetOptionPrerequisite,
  isRepeatable,
  validateLoresheet,
  validateLoresheetOption,
} from "../../../data/loresheets";
import { ICharacterState } from "./index";

export interface ILoresheetOptionState {
  uid: string;
  payload: any;
}

export interface ILoresheetsState {
  [lsUid: string]: ILoresheetOptionState[];
}

export function createState(): ILoresheetsState {
  return {};
}

export function isLoresheetPresent(
  state: ILoresheetsState,
  loresheetUid: string,
): boolean {
  const loresheetIndex = Object.keys(state).findIndex(
    stateLoresheetUid => stateLoresheetUid === loresheetUid,
  );
  return loresheetIndex !== -1;
}

export function isLoresheetOptionPresent(
  state: ILoresheetsState,
  loresheetUid: string,
  optionUid: string,
): boolean {
  if (state[loresheetUid] === undefined) {
    return false;
  }
  const optionIndex = state[loresheetUid].findIndex(
    option => option.uid === optionUid,
  );
  return optionIndex !== -1;
}

export function canOpenLoresheet(state: ICharacterState, uid: string): boolean {
  return !isLoresheetPresent(state.loresheets, uid);
}

function _or(a: boolean, b: boolean) {
  return a || b;
}
function _and(a: boolean, b: boolean) {
  return a && b;
}

function _prerequisiteToBool(
  state: ILoresheetsState,
  lsUid: string,
  prerequisite: IDataLoresheetOptionPrerequisite,
): boolean {
  if (typeof prerequisite === "string") {
    return isLoresheetOptionPresent(state, lsUid, prerequisite);
  } else {
    return prerequisite.prerequisites
      .map((optUid: string) => {
        const here = isLoresheetOptionPresent(state, lsUid, optUid);
        return here;
      })
      .reduce(
        prerequisite.type === "OR" ? _or : _and,
        prerequisite.type === "OR" ? false : true,
      );
  }
}

export function canBuyLoresheetOption(
  state: ILoresheetsState,
  lsUid: string,
  uid: string,
): boolean {
  if (!isLoresheetPresent(state, lsUid)) {
    return false;
  } // Not opened
  const lsOptData = getLoresheetOptionData(lsUid, uid);
  const isPresent = isLoresheetOptionPresent(state, lsUid, uid);
  if (isPresent) {
    if (!isRepeatable(lsUid)) {
      return false;
    } else {
      return (lsOptData as IDataLoresheetOption).repeatable;
    }
  } // Already bought
  const cb = lsOptData.prerequisites
    .map(p => _prerequisiteToBool(state, lsUid, p))
    .reduce(_and, true);
  return cb;
}

export function buyLoresheetOption(
  state: ILoresheetsState,
  loresheetUid: string,
  optionUid: string,
  payload?: string,
): void {
  validateLoresheet(loresheetUid);
  validateLoresheetOption(loresheetUid, optionUid);

  if (!canBuyLoresheetOption(state, loresheetUid, optionUid)) {
    throw new Error(
      "Internal error : impossible to buy loresheet option " +
        loresheetUid +
        "," +
        optionUid,
    );
  }
  state[loresheetUid].push({ uid: optionUid, payload });
}

export function openLoresheet(
  state: ILoresheetsState,
  loresheetUid: string,
): void {
  validateLoresheet(loresheetUid);
  state[loresheetUid] = [];
}

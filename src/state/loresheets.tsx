import { optionLoresheetData, validateLoresheet, validateLoresheetOption } from 'data/loresheets';

import { canPayCost, getCostOpenLoresheet } from 'state/costs';
import { IStoreState } from 'state/type';

export interface ILoresheetOptionState {
  uid: string;
}

export interface ILoresheetsState {
  [lsUid: string]: ILoresheetOptionState[];
}

export function createState() : ILoresheetsState {
  return {};
}

export function openLoresheet(state: ILoresheetsState, loresheetUid: string): void {
  validateLoresheet(loresheetUid);
  state[loresheetUid] = [];
}

export function isLoresheetPresent(state: ILoresheetsState, loresheetUid: string) : boolean {
  const loresheetIndex = Object.keys(state).findIndex(stateLoresheetUid => stateLoresheetUid===loresheetUid);
  return loresheetIndex !== -1;
}

export function isLoresheetOptionPresent(state: ILoresheetsState, loresheetUid: string, optionUid: string) : boolean {
  const optionIndex = state[loresheetUid].findIndex(option => option.uid === optionUid);
  return optionIndex !== -1;
}

export function addLoresheetOption(state: ILoresheetsState, loresheetUid: string, optionUid: string): void {
  validateLoresheet(loresheetUid);
  validateLoresheetOption(loresheetUid, optionUid);

  if (! isLoresheetPresent(state, loresheetUid) ) { throw new Error('Internal error : loresheet not found'); }
  if ( isLoresheetOptionPresent(state, loresheetUid, optionUid)
  && !optionLoresheetData(loresheetUid, optionUid).repeatable) {
    throw new Error('Internal error : loresheet option is not repeatable');
  }
  /* TODO check prerequisites */

  state[loresheetUid].push({uid: optionUid});
}

export function canBuyLoresheet(state: IStoreState, uid: string): boolean {
  if (isLoresheetPresent(state.loresheets, uid)) { return false; } // Already opened
  const cost = getCostOpenLoresheet(state, uid);
  return canPayCost(state, cost);
}


import * as Immutable from 'immutable';

import {
  IStoreLoresheet, IStoreLoresheetOption,
  IStoreState,
  loresheetFactory, loresheetOptionFactory } from 'state/types';

export function getLoresheetIndex(state: IStoreState, loresheetUid: string): number {
  return state.get('loresheets').findIndex((loresheetInState: IStoreLoresheet) => {
      return loresheetInState.uid === loresheetUid; });
}

export function addLoresheet(state: IStoreState, loresheetUid: string): void {
  state.updateIn(['loresheets'], (list: Immutable.List<IStoreLoresheet>) => {
    const newLoresheet =
      loresheetFactory({ uid: loresheetUid });
    return list.push(newLoresheet);
  });
}

export function getLoresheetOptionIndex(state: IStoreState, loresheetUid: string, loresheetOptionUid: string): number {
  return state.get('loresheetOptions').findIndex((optionsInState: IStoreLoresheetOption) => {
    return optionsInState.loresheetUid === loresheetUid && optionsInState.uid === loresheetOptionUid;
  });
}

export function addLoresheetOption(state: IStoreState, lsUid: string, optionUid: string): void {
  const loresheetIndex = getLoresheetIndex(state, lsUid);
  if (loresheetIndex === -1) { throw new Error('Internal error : loresheet not found'); }
  state.updateIn(['loresheetOptions'], (list: Immutable.List<IStoreLoresheetOption>) => {
    const newOption = loresheetOptionFactory({ loresheetUid: lsUid, uid: optionUid });
    return list.push(newOption);
  });
}

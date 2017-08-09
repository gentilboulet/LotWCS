import * as Immutable from 'immutable';

import { ILoresheetAction } from '../actions/loresheets';
import * as constants from '../constants/loresheets';
import { applyCost } from '../costs/reducer';
import { pushToHistory } from './history';
import {
  IStoreLoresheet, IStoreLoresheetOption,
  IStoreState,
  loresheetFactory, loresheetOptionFactory } from '../types/state';

export function getLoresheetIndex(state: IStoreState, loresheetUid: string): number {
  return state.get('loresheets').findIndex((loresheetInState: IStoreLoresheet) => {
      return loresheetInState.uid === loresheetUid; });
}

export function getLoresheetOptionIndex(state: IStoreState, loresheetUid: string, loresheetOptionUid: string): number {
  return state.get('loresheetOptions').findIndex((optionsInState: IStoreLoresheetOption) => {
    return optionsInState.loresheetUid === loresheetUid && optionsInState.uid === loresheetOptionUid;
  });
}

export function loresheetsReducer(oldState: IStoreState, action: ILoresheetAction): IStoreState {
  switch (action.type) {
    case constants.LORESHEET_OPEN:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        state.updateIn(['loresheets'], (list: Immutable.List<IStoreLoresheet>) => {
          const newLoresheet =
            loresheetFactory({ uid: action.uid });
          return list.push(newLoresheet);
        });

        pushToHistory(state, action);
      });
    case constants.LORESHEET_BUY_OPTION:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        const loresheetIndex = state.getIn(['loresheets']).findIndex((ls: IStoreLoresheet) => {
          return ls.uid === action.lsUid;
        });
        if (loresheetIndex === -1) { throw new Error('Internal error : loresheet not found'); }
        state.updateIn(['loresheetOptions'], (list: Immutable.List<IStoreLoresheetOption>) => {
          const newOption = loresheetOptionFactory({ loresheetUid: action.lsUid, uid: action.uid });
          return list.push(newOption);
        });

        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

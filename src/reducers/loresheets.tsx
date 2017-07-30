import { ILoresheetAction } from '../actions/loresheets';
import { IStoreState, IStoreLoresheetJS, IStoreLoresheetOptionJS,
  loresheetFactory, loresheetOptionFactory } from '../types/state';
import * as constants from '../constants/loresheets';
import { pushToHistory } from './history';
import { applyCost } from './costs';
import * as Immutable from 'immutable';

export function loresheetsReducer(oldState: IStoreState, action: ILoresheetAction): IStoreState {
  switch (action.type) {
    case constants.LORESHEET_OPEN:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        state.updateIn(['loresheets'], (list) => {
          const newLoresheet =
            loresheetFactory({ uid: action.uid, options: Immutable.List<IStoreLoresheetOptionJS>() });
          return list.push(newLoresheet);
        });

        pushToHistory(state, action);
      });
    case constants.LORESHEET_BUY_OPTION:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        const loresheetIndex = state.getIn(['loresheets']).findIndex((ls: IStoreLoresheetJS) => {
          return ls.uid === action.lsUid;
        });

        state.updateIn(['loresheets', loresheetIndex, 'options'], (list: Immutable.List<IStoreLoresheetOptionJS>) => {
          const newOption = loresheetOptionFactory({ uid: action.uid });
          return list.push(newOption);
        });

        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

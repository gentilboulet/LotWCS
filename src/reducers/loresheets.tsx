import { ILoresheetAction } from '../actions/loresheets';
import { IStoreState, IStoreLoresheetsJS, IStoreLoresheetOptionJS } from '../types/state';
import * as constants from '../constants/loresheets';
import { pushToHistory } from './history';
import { applyCost } from './costs';
import * as Immutable from 'immutable';

export function loresheetsReducer(oldState: IStoreState, action: ILoresheetAction): IStoreState {
  switch (action.type) {
    case constants.LORESHEET_OPEN:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        state.updateIn(['loresheets'], (list: Immutable.List<IStoreLoresheetsJS>) => {
          return list.push({
            uid: action.uid, options: Immutable.List<IStoreLoresheetOptionJS>()
          }); }
        );

        pushToHistory(state, action);
      });
    case constants.LORESHEET_BUY_BONUS:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        const lsIdx = state.getIn(['loresheets']).findIndex((ls: IStoreLoresheetsJS) => {
          return ls.uid === action.lsUid;
        });
        state.updateIn(['loresheets', lsIdx, 'options'], (list: Immutable.List<IStoreLoresheetOptionJS>) => {
          return list.push({uid: action.uid});
        });
        pushToHistory(state, action);
        throw 'action not handled yet.';
      });
    default:
  }
  return oldState;
}

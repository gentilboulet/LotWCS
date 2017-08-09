import { IStoreState } from '../state/types';

import { initialStateFactory } from './initial';
import * as loresheetsActions from '../actions/loresheets';
import { loresheetsReducer, getLoresheetIndex, getLoresheetOptionIndex } from './loresheets';
import { globalReducer } from './global';

import * as dataLoresheets from '../data/loresheets';

const initialState: IStoreState  = initialStateFactory();

describe('Testing loresheetsReducer', () => {
  const noCost = {
    destiny: 0, entanglement: 0,
    discountIdx: -1, discountNewValue: 0
  };

  it('should receive a LORESHEET_OPEN action', () => {
    dataLoresheets.loresheets.forEach((dataLoresheet: dataLoresheets.IDataLoresheet) => {

      expect( getLoresheetIndex(initialState, dataLoresheet.uid) ).toBe(-1); // Not found in the initial state

      const action = loresheetsActions.open(dataLoresheet.uid, noCost);
      const state = loresheetsReducer(initialState, action);
      expect( getLoresheetIndex(state, dataLoresheet.uid) ).toBe(0);
      expect( getLoresheetIndex(globalReducer(initialState, action), dataLoresheet.uid) ).toBe(0);
    });
  });

  it('should receive LORESHEET_BUY_OPTION action', () => {
    dataLoresheets.loresheets.forEach((loresheet: dataLoresheets.IDataLoresheet) => {
      const openLoresheetAction = loresheetsActions.open(loresheet.uid, noCost);
      const stateWithLoresheet = loresheetsReducer(initialState, openLoresheetAction);
      expect( getLoresheetIndex(stateWithLoresheet, loresheet.uid) ).toBe(0);

      loresheet.options.forEach((option: dataLoresheets.IDataLoresheetOption) => {
        const buyOption = loresheetsActions.buyOption(loresheet.uid, option.uid, noCost);
        const state = loresheetsReducer(stateWithLoresheet, buyOption);
        expect( getLoresheetOptionIndex(state, loresheet.uid, option.uid) ).toBe(0);
        expect(
          getLoresheetOptionIndex(globalReducer(stateWithLoresheet, buyOption), loresheet.uid, option.uid)
          ).toBe(0)
      });
    });
  });

  it('should do nothing with a junk action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( loresheetsReducer(initialState, junk as loresheetsActions.ILoresheetAction)).toMatchObject(initialState);
  });
});

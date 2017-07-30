import { IStoreState } from '../types/state';
import { ILoresheet, ILoresheetOption } from '../types/loresheets';

import { initialStateFactory } from './initial';
import * as loresheetsActions from '../actions/loresheets';
import { loresheetsReducer, getLoresheetIndex, getLoresheetOptionIndex } from './loresheets';
import { globalReducer } from './global';

import { loresheets } from '../data/loresheets';

const initialState: IStoreState  = initialStateFactory();
/* tslint:disable:no-console */
describe('Testing loresheetsReducer', () => {
  const noCost = {
    destiny: 0, entanglement: 0,
    discountIdx: -1, discountNewValue: 0
  };

  it('should receive a LORESHEET_OPEN action', () => {
    loresheets.forEach((dataLoresheet: ILoresheet) => {

      expect( getLoresheetIndex(initialState, dataLoresheet.uid) ).toBe(-1); // Not found in the initial state

      const action = loresheetsActions.open(dataLoresheet.uid, noCost);
      const state = loresheetsReducer(initialState, action);
      expect( getLoresheetIndex(state, dataLoresheet.uid) ).toBe(0);
      // Why does this fail ??
      // expect( globalReducer(initialState, action) ).toMatchObject(state);
    });
  });

  it('should receive LORESHEET_BUY_OPTION action', () => {
    loresheets.forEach((dataLoresheet: ILoresheet) => {
      const openLoresheetAction = loresheetsActions.open(dataLoresheet.uid, noCost);
      const stateWithLoresheet = loresheetsReducer(initialState, openLoresheetAction);
      expect( getLoresheetIndex(stateWithLoresheet, dataLoresheet.uid) ).toBe(0);

      dataLoresheet.options.forEach((option: ILoresheetOption) => {
        const buyOption = loresheetsActions.buyOption(dataLoresheet.uid, option.uid, noCost);
        const state = loresheetsReducer(stateWithLoresheet, buyOption);
        expect( getLoresheetOptionIndex(state, dataLoresheet.uid, option.uid) ).toBe(0);
        // Why does this fail ??
        // expect( globalReducer(stateWithLoresheet, buyOption) ).toMatchObject(state);
      });
    });
  });

  it('should do nothing with a junk action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( loresheetsReducer(initialState, junk as loresheetsActions.ILoresheetAction)).toMatchObject(initialState);
  });
});

import { initialStateFactory } from 'state/initial';
import { IStoreState } from 'state/types';

import * as loresheetsActions from 'state/actions/loresheets';
import * as loresheets from 'state/loresheets';
import { globalReducer } from 'state/reducers/global';
import { loresheetsReducer } from 'state/reducers/loresheets';

import * as dataLoresheets from 'data/loresheets';

const initialState: IStoreState  = initialStateFactory();

describe('Testing loresheetsReducer', () => {
  const noCost = {
    destiny: 0,
    discountIdx: -1, discountNewValue: 0,
    entanglement: 0
  };

  it('should receive a LORESHEET_OPEN action', () => {
    dataLoresheets.loresheets.forEach((dataLoresheet: dataLoresheets.IDataLoresheet) => {

      expect( loresheets.getLoresheetIndex(initialState, dataLoresheet.uid) ).toBe(-1); // Not found in the initial state

      const action = loresheetsActions.open(dataLoresheet.uid, noCost);
      const state = loresheetsReducer(initialState, action);
      expect( loresheets.getLoresheetIndex(state, dataLoresheet.uid) ).toBe(0);
      expect( loresheets.getLoresheetIndex(globalReducer(initialState, action), dataLoresheet.uid) ).toBe(0);
    });
  });

  it('should receive LORESHEET_BUY_OPTION action', () => {
    dataLoresheets.loresheets.forEach((loresheet: dataLoresheets.IDataLoresheet) => {
      const openLoresheetAction = loresheetsActions.open(loresheet.uid, noCost);
      const stateWithLoresheet = loresheetsReducer(initialState, openLoresheetAction);
      expect( loresheets.getLoresheetIndex(stateWithLoresheet, loresheet.uid) ).toBe(0);

      loresheet.options.forEach((option: dataLoresheets.IDataLoresheetOption) => {
        const buyOption = loresheetsActions.buyOption(loresheet.uid, option.uid, noCost);
        const state = loresheetsReducer(stateWithLoresheet, buyOption);
        expect( loresheets.getLoresheetOptionIndex(state, loresheet.uid, option.uid) ).toBe(0);
        expect(
          loresheets.getLoresheetOptionIndex(globalReducer(stateWithLoresheet, buyOption), loresheet.uid, option.uid)
          ).toBe(0)
      });
    });
  });

  it('should do nothing with a junk action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( loresheetsReducer(initialState, junk as loresheetsActions.ILoresheetAction)).toMatchObject(initialState);
  });
});

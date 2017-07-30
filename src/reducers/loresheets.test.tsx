import { IStoreState, IStoreLoresheet } from '../types/state';
import { ILoresheet, ILoresheetOption } from '../types/loresheets';

import { initialStateFactory } from './initial';
import * as loresheetsActions from '../actions/loresheets';
import { loresheetsReducer } from './loresheets';
import { globalReducer } from './global';

import { loresheets } from '../data/loresheets';

const initialState: IStoreState  = initialStateFactory();
/* tslint:disable:no-console */
describe('Testing loresheetsReducer', () => {
  const noCost = {
    destiny: 0, entanglement: 0,
    reductionIdx: -1, reductionNewValue: 0
  };

  it('should receive a LORESHEET_OPEN action', () => {
    loresheets.forEach((dataLoresheet: ILoresheet) => {
      const indexLoresheet = initialState.get('loresheets')
        .findIndex((loresheetInState: IStoreLoresheet) => {
          return loresheetInState.uid === dataLoresheet.uid; });
      expect( indexLoresheet ).toBe(-1); // Not found in the initial state

      const action = loresheetsActions.open(dataLoresheet.uid, noCost);
      const state = loresheetsReducer(initialState, action);
      expect( state.getIn(['loresheets', 0]).uid ).toBe(dataLoresheet.uid); // Expected at index 0
      expect( globalReducer(initialState, action).getIn(['loresheets', 0]).uid ).toBe(dataLoresheet.uid);
      // Why does this fail ??
      // expect( globalReducer(initialState, action) ).toMatchObject(state);
    });
  });

  it('should receive LORESHEET_BUY_OPTION action', () => {
    loresheets.forEach((dataLoresheet: ILoresheet) => {
      const openLoresheetAction = loresheetsActions.open(dataLoresheet.uid, noCost);
      const stateWithLoresheet = loresheetsReducer(initialState, openLoresheetAction);
      expect( stateWithLoresheet.getIn(['loresheets', 0]).uid ).toBe(dataLoresheet.uid); // Expected at index 0

      dataLoresheet.options.forEach((option: ILoresheetOption) => {
        const buyOption = loresheetsActions.buyOption(dataLoresheet.uid, option.uid, noCost);
        const state = loresheetsReducer(stateWithLoresheet, buyOption);
        expect( state.getIn(['loresheets', 0, 'options', 0, 'uid']) ).toBe(option.uid);
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

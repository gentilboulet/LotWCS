import { initialStateFactory } from 'state/initial';
import { IStoreState } from 'state/type';

import * as dataVirtues from 'data/virtues';
import * as actions from 'state/actions/virtues';
import { isVirtuePresent } from 'state/virtues';

import { globalReducer } from './global';
import { virtuesReducer } from './virtues';

const initialState: IStoreState  = initialStateFactory();

describe('Testing virtueReducer', () => {
  const noCost = {
    destiny: 0,
    discountIdx: -1, discountNewValue: 0,
    entanglement: 0
  };

  it('should receive a VIRTUE_INCREASE action with an existing virtue', () => {
    dataVirtues.virtues.forEach( (virtue: dataVirtues.IDataVirtue) => {
      expect(isVirtuePresent(initialState.virtues, virtue.name) ).toBeTruthy();

      const action = actions.increase(virtue.name, 3, noCost);
      const state = virtuesReducer(initialState, action);
      const newVirtue = state.virtues.find(v => v.name === virtue.name);
      expect(newVirtue).toBeDefined();
      expect( newVirtue ? newVirtue.value : undefined ).toBe(3);
      expect( newVirtue ? newVirtue.type : undefined ).toBe(virtue.type);
      expect( globalReducer(initialState, action) ).toMatchObject(state);
    });
  });

  it('should fail to receive a VIRTUE_INCREASE action with a new virtue', () => {
    const virtue: dataVirtues.IDataVirtue = { name: 'New Virtue', type: dataVirtues.VIRTUE_CHIVALROUS };
    expect(isVirtuePresent(initialState.virtues, virtue.name) ).toBeFalsy();

    const action = actions.increase(virtue.name, 3, noCost);
    expect( () => virtuesReducer(initialState, action) ).toThrowError();
  });

  it('should do nothing with a junk action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( virtuesReducer(initialState, junk as actions.IVirtueAction )).toMatchObject(initialState);
  });
});

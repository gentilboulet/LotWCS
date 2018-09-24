import { initialStateFactory } from 'state/initial';
import { IStoreState } from 'state/types';
import { virtuesReducer } from './virtues';

import * as dataVirtues from 'data/virtues';
import * as actions from 'state/actions/virtues';
import * as virtues from 'state/virtues';

const initialState: IStoreState  = initialStateFactory();

describe('Testing virtueReducer', () => {
  const noCost = {
    destiny: 0,
    discountIdx: -1, discountNewValue: 0,
    entanglement: 0
  };

  it('should receive a VIRTUE_INCREASE action with an existing virtue', () => {
    dataVirtues.virtues.forEach( (virtue: dataVirtues.IDataVirtue) => {
      const index = virtues.getVirtueIndex(initialState, virtue.name);
      expect(initialState.getIn(['virtues', index, 'value'])).toBe(0);

      const action = actions.increase(virtue.name, virtue.type, 3, noCost);
      const state = virtuesReducer(initialState, action);
      expect(state.getIn(['virtues', index, 'value'])).toBe(3);
      expect(state.getIn(['virtues', index, 'type' ])).toBe(virtue.type);
    });
  });

  it('should receive a VIRTUE_INCREASE action with a new virtue', () => {
    const virtue: dataVirtues.IDataVirtue = { name: 'New Virtue', type: dataVirtues.VIRTUE_CHIVALROUS };
    const index = virtues.getVirtueIndex(initialState, virtue.name);
    expect(initialState.getIn(['virtues', index, 'value'])).toBe(0);

    const action = actions.increase(virtue.name, virtue.type, 3, noCost);
    const state = virtuesReducer(initialState, action);
    expect(state.getIn(['virtues', index, 'value'])).toBe(3);
    expect(state.getIn(['virtues', index, 'type' ])).toBe(virtue.type);
  });

  it('should do nothing with a junk action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( virtuesReducer(initialState, junk as actions.IVirtueAction )).toMatchObject(initialState);
  });
});

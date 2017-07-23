import { IStoreState } from '../types/state';

import { initialStateFactory } from './initial';
import * as actions from '../actions/bonuses';
import { applyBonuses } from './bonuses';

const initialState: IStoreState  = initialStateFactory();

describe('Testing applyBonuses', () => {
  it('should receive a BONUS_DESTINY action', () => {
    const bonuses = [actions.destiny(12)];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.get('destiny') ).toBe(0);
    expect( state.get('destiny') ).toBe(12);
  });

  it('should receive a BONUS_ENTANGLEMENT action', () => {
    const bonuses = [actions.entanglement(13)];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.get('entanglement') ).toBe(0);
    expect( state.get('entanglement') ).toBe(13);
  });

  it('should receive a BONUS_STARTING_CHI action', () => {
    const bonuses = [actions.startingChi(14)];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.get('chi') ).toBe(0);
    expect( state.get('chi') ).toBe(14);
  });

  it('should receive a BONUS_SKILL_RANK action', () => {
    const bonuses = [actions.skillRank('Awareness')];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.getIn(['skills', 0, 'value']) ).toBe(0);
    expect( state.getIn(['skills', 0, 'value']) ).toBe(5);
  });

  /*it('BONUS_SPECIALITY', () => {

  });*/

  it('should handle an empty list', () => {
    const state = applyBonuses(initialState, []);
    expect(state).toMatchObject(initialState);
  });

  it('should do nothing with a junk bonus', () => {
    const junk = { type: 'JUNK' };
    const bonuses = [actions.destiny(12), actions.entanglement(13), actions.startingChi(14), junk];
    const state = applyBonuses(initialState, bonuses);
    expect( state.get('destiny') ).toBe(12);
    expect( state.get('entanglement') ).toBe(13);
    expect( state.get('chi') ).toBe(14);
  });

});

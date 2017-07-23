import { IStoreState } from '../types/state';

import { initialStateFactory } from './initial';
import * as actions from '../actions/bonuses';
import { applyBonuses } from './bonuses';

const initialState: IStoreState  = initialStateFactory();

describe('Testing applyBonuses', () => {
  it('BONUS_DESTINY', () => {
    const bonuses = [actions.destiny(12)];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.get('destiny') ).toBe(0);
    expect( state.get('destiny') ).toBe(12);
  });

  it('BONUS_ENTANGLEMENT', () => {
    const bonuses = [actions.entanglement(13)];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.get('entanglement') ).toBe(0);
    expect( state.get('entanglement') ).toBe(13);
  });

  it('BONUS_STARTING_CHI', () => {
    const bonuses = [actions.startingChi(14)];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.get('chi') ).toBe(0);
    expect( state.get('chi') ).toBe(14);
  });

  it('BONUS_SKILL_RANK', () => {
    const bonuses = [actions.skillRank('Awareness')];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.getIn(['skills', 0, 'value']) ).toBe(0);
    expect( state.getIn(['skills', 0, 'value']) ).toBe(5);
  });

  /*it('BONUS_SPECIALITY', () => {

  });*/

  it('No bonus', () => {
    const state = applyBonuses(initialState, []);
    expect(state).toMatchObject(initialState);
  });

  it('Junk values', () => {
    const bonuses = [actions.destiny(12), actions.entanglement(13), actions.startingChi(14)];
    const state = applyBonuses(initialState, bonuses);
    expect( state.get('destiny') ).toBe(12);
    expect( state.get('entanglement') ).toBe(13);
    expect( state.get('chi') ).toBe(14);
  });

});

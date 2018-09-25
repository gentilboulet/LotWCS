import { initialStateFactory } from 'state/initial';
import { IStoreState } from 'state/types';

import { applyBonuses } from './bonuses';

import { IBonus } from 'perks/types/bonuses';

import * as actions from 'perks/actions/bonuses';
import * as skills from 'state/skills';

const initialState: IStoreState  = initialStateFactory();

describe('Testing applyBonuses', () => {
  it('should receive a BONUS_DESTINY', () => {
    const bonuses = [actions.destiny(12)];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.get('destiny') ).toBe(0);
    expect( state.get('destiny') ).toBe(12);
  });

  it('should receive a BONUS_ENTANGLEMENT', () => {
    const bonuses = [actions.entanglement(13)];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.get('entanglement') ).toBe(0);
    expect( state.get('entanglement') ).toBe(13);
  });

  it('should receive a BONUS_CHI', () => {
    const bonuses = [actions.chi(14, 'general')];
    const state = applyBonuses(initialState, bonuses);
    expect( initialState.get('chi').getChi('general') ).toBe(0);
    expect( state.get('chi').getChi('general') ).toBe(14);
  });

  it('should receive a BONUS_SKILL_RANK', () => {
    const bonuses = [actions.skillRank('Awareness')];
    const state = applyBonuses(initialState, bonuses);
    expect( skills.getSkillIndex(initialState, 'Awareness') ).toBe(0);
    expect( initialState.getIn(['skills', 0, 'value']) ).toBe(0);
    expect( state.getIn(['skills', 0, 'value']) ).toBe(5);
  });

  it('should receive a BONUS_SPECIALITY', () => {
    const testSkill = 'Awareness';
    const testSpeciality = 'Hear';

    const bonuses = [actions.speciality(testSkill, testSpeciality)];
    const state = applyBonuses(initialState, bonuses);

    expect( skills.getSpecialityIndex(initialState, testSkill, testSpeciality) ).toBe(-1);
    expect( skills.getSpecialityIndex(state, testSkill, testSpeciality) ).toBe(0);
  });

  it('should receive a BONUS_CULTIVATION', () => {
    const bonuses = [actions.cultivation(4, 'fire')];
    const state = applyBonuses(initialState, bonuses);

    expect( initialState.get('chi').getChi('fire') ).toBe(0);
    expect( state.get('chi').getChi('fire') ).toBe(2);
    expect( initialState.get('chi').getCultivation('fire') ).toBe(0);
    expect( state.get('chi').getCultivation('fire') ).toBe(1);
  });

  it('should handle an empty list', () => {
    const state = applyBonuses(initialState, []);
    expect(state).toMatchObject(initialState);
  });

  it('should do nothing with a junk bonus', () => {
    const junk = { type: 'JUNK' };
    const bonuses = [actions.destiny(12), actions.entanglement(13), actions.chi(14, 'general'), junk as IBonus];
    const state = applyBonuses(initialState, bonuses);
    expect( state.get('destiny') ).toBe(12);
    expect( state.get('entanglement') ).toBe(13);
    expect( state.get('chi').getChi('general') ).toBe(14);
  });

});

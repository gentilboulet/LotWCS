import { IStoreState } from 'state/type';

import * as dataSkills from 'data/skills';

import { initialStateFactory } from 'state/initial';
import { addSpeciality,  canBuySkill, canBuySpeciality, increase, isSpecialityPresent } from 'state/skills';

describe('Testing skillsReducer', () => {
  it('should do increase existing skills value', () => {
    Object.keys(dataSkills.skills).forEach( key => {
      const state = initialStateFactory();
      expect(state.skills[key].value).toBe(0);
      increase(state.skills, key, 5);
      expect(state.skills[key].value).toBe(5);
    });
  });

  it('should refuse to increase an overflowing skill value', () => {
    const initialState: IStoreState  = initialStateFactory();
    Object.keys(dataSkills.skills).forEach( key => {
      expect(initialState.skills[key].value).toBe(0);
      expect( () => increase(initialState.skills, key, 4) ).toThrowError();
    });
  });


  it('should add a speciality to an existing skill', () => {
    const state = initialStateFactory();
    expect(state.skills.Awareness.specialities).toMatchObject([]);
    addSpeciality(state.skills, 'Awareness', 'Speciality');
    expect(isSpecialityPresent(state.skills, 'Awareness', 'Speciality')).toBeTruthy();
  });

  it('should not add a speciality to an unknown skill', () => {
    const state = initialStateFactory();
    expect( () => addSpeciality(state.skills, 'Totally not a skill', 'Speciality') ).toThrowError();
  });

  it('should not add a speciality twice', () => {
    const state = initialStateFactory();
    expect(state.skills.Awareness.specialities).toMatchObject([]);
    addSpeciality(state.skills, 'Awareness', 'Speciality');
    expect(isSpecialityPresent(state.skills, 'Awareness', 'Speciality')).toBeTruthy();
    expect( () => addSpeciality(state.skills, 'Awareness', 'Speciality')).toThrowError();
  });

  it('should check canBuySkill', () => {
      const state: IStoreState  = initialStateFactory();
      const skill = 'Awareness';

      expect( canBuySkill(state, skill) ).toBeFalsy(); // No max available
      state.rank = {name: 'placeholder', value: 0};
      expect( canBuySkill(state, skill) ).toBeFalsy(); // Overflow
      state.rank.value = 1;
      expect( canBuySkill(state, skill) ).toBeFalsy(); // No destiny
      state.destiny = 5;
      expect( canBuySkill(state, skill) ).toBeTruthy();
  });

  it('should check canBuySpeciality', () => {
      const state: IStoreState  = initialStateFactory();
      const skill = 'Awareness';
      const speciality = 'Speciality';

      expect( canBuySpeciality(state, skill, speciality) ).toBeFalsy(); // No destiny
      state.destiny = 1;
      expect( canBuySpeciality(state, skill, speciality) ).toBeTruthy();
      addSpeciality(state.skills, skill, speciality);
      expect( canBuySpeciality(state, skill, speciality) ).toBeFalsy(); // Not twice
  });
});

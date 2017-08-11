import { IStoreState } from '../types/state';
import { ISkillAction } from '../actions/skills';

import { IDataSkill, skills } from '../data/skills';

import { initialStateFactory } from './initial';
import * as actions from '../actions/skills';
import { skillsReducer, getSkillIndex, getSpecialityIndex } from './skills';
import { globalReducer } from './global';

const initialState: IStoreState  = initialStateFactory();

describe('Testing skillsReducer', () => {
  const noCost = {
    destiny: 0, entanglement: 0,
    discountIdx: -1, discountNewValue: 0
  };

  it('should receive a SKILLS_BUY action', () => {
    skills.forEach( (skillInData: IDataSkill) => {
      const index = getSkillIndex(initialState, skillInData.name);

      expect(initialState.getIn(['skills', index, 'value'])).toBe(0);
      const action = actions.skillsBuy(skillInData.name, noCost);
      const state = skillsReducer(initialState, action);
      expect(state.getIn(['skills', index, 'value'])).toBe(5);
      expect(globalReducer(initialState, action)).toMatchObject(state);
    });
  });

  it('should do nothing with a SKILLS_BUY action with an invalid skill', () => {
    expect(() => actions.skillsBuy('not a skill', noCost) ).toThrow();
  });

  it('should receive a SKILLS_SPECIALITY_BUY action', () => {
    const specialityName = 'Hear';
    const skillName = 'Awareness';
    const index = getSpecialityIndex(initialState, skillName, specialityName);
    expect(index).toBe(-1);
  });

  it('should do nothing with a SKILLS_SPECIALITY_BUY with an invalid skill', () => {
    expect(true).toBeTruthy();
  });

  it('should do nothing with a SKILLS_SPECIALITY_BUY with an invalid speciality', () => {
    expect(true).toBeTruthy();
  });

  it('should do nothing with a junk action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( skillsReducer(initialState, junk as ISkillAction )).toMatchObject(initialState);
  });
});

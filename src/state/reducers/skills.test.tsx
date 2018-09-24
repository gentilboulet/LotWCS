import { ISkillAction } from 'state/actions/skills';
import { IStoreState } from 'state/types';

import * as dataSkills from 'data/skills';

import * as actions from 'state/actions/skills';
import { initialStateFactory } from 'state/initial';
import { skillsReducer } from 'state/reducers/skills';
import * as skills from 'state/skills';

const initialState: IStoreState  = initialStateFactory();

describe('Testing skillsReducer', () => {
  const noCost = {
    destiny: 0,
    discountIdx: -1, discountNewValue: 0,
    entanglement: 0
  };

  it('should receive a SKILLS_BUY action', () => {
    dataSkills.skills.forEach( (skillInData: dataSkills.IDataSkill) => {
      const index = skills.getSkillIndex(initialState, skillInData.name);

      expect(initialState.getIn(['skills', index, 'value'])).toBe(0);
      const action = actions.skillsBuy(skillInData.name, noCost);
      const state = skillsReducer(initialState, action);
      expect(state.getIn(['skills', index, 'value'])).toBe(5);
    });
  });

  it('should not accept an overflow on a SKILLS_BUY action', () => {
    dataSkills.skills.forEach( (skillInData: dataSkills.IDataSkill) => {
      const index = skills.getSkillIndex(initialState, skillInData.name);

      expect(initialState.getIn(['skills', index, 'value'])).toBe(0);
      const action = actions.skillsBuy(skillInData.name, noCost);
      const state = skillsReducer(initialState, action);
      expect(state.getIn(['skills', index, 'value'])).toBe(5);
    });
  });

  it('should receive a SKILLS_SPECIALITY_BUY action', () => {
    const specialityName = 'Hear';
    const skillName = 'Awareness';
    const index = skills.getSpecialityIndex(initialState, skillName, specialityName);
    expect(index).toBe(-1);

    const action = actions.skillSpecialityBuy(skillName, specialityName, noCost);
    const state = skillsReducer(initialState, action);
    expect( skills.getSpecialityIndex(state, skillName, specialityName) ).toBe(0);
  });

  it('should should not receive an already bought SKILLS_SPECIALITY_BUY action', () => {
    const specialityName = 'Hear';
    const skillName = 'Awareness';
    const action = actions.skillSpecialityBuy(skillName, specialityName, noCost);
    const state = skillsReducer(initialState, action);
    expect( skills.getSpecialityIndex(state, skillName, specialityName) ).toBe(0);
    expect( () => { skillsReducer(state, action); }).toThrowError();
  });

  it('should do nothing with a junk action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( skillsReducer(initialState, junk as ISkillAction )).toMatchObject(initialState);
  });
});

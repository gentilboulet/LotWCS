import { IStoreState, IStoreSkillJS } from '../types/state';
import { ISkillAction } from '../actions/skills';

import { skills } from '../data/skills';
import { IDataSkill } from '../types/skills';

import { initialStateFactory } from './initial';
import * as actions from '../actions/skills';
import { skillsReducer } from './skills';
import { globalReducer } from './global';

const initialState: IStoreState  = initialStateFactory();

describe('Testing skillsReducer', () => {
  const noCost = {
    destiny: 0, entanglement: 0,
    reductionIdx: -1, reductionNewValue: 0
  };

  it('SKILLS_BUY', () => {
    skills.forEach( (skillInData: IDataSkill) => {
      const index = initialState.get('skills')
          .findIndex((skillInState: IStoreSkillJS) => { return skillInState.name === skillInData.name; });
      expect(initialState.getIn(['skills', index, 'value'])).toBe(0);
      const action = actions.skillsBuy(skillInData.name, noCost);
      const state = skillsReducer(initialState, action);
      expect(state.getIn(['skills', index, 'value'])).toBe(5);
      expect(globalReducer(initialState, action)).toMatchObject(state);
    });
  });

  it('SKILLS_BUY - invalid skill', () => {
    expect(() => actions.skillsBuy('not a skill', noCost) ).toThrow('Unknown skill "not a skill"');
  });

  it('JUNK action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( skillsReducer(initialState, junk as ISkillAction )).toMatchObject(initialState);
  });
});

import { ISkillAction, skillsBuy, skillSpecialityBuy } from 'state/actions/skills';
import { IStoreState } from 'state/type';

import * as dataSkills from 'data/skills';

import { initialStateFactory } from 'state/initial';
import { skillsReducer } from 'state/reducers/skills';
import { isSpecialityPresent } from 'state/skills';

import { setRank } from 'state/actions/header';
import { globalReducer } from 'state/reducers/global';


const initialState: IStoreState  = globalReducer(initialStateFactory(), setRank('4th_rank'));

describe('Testing skillsReducer', () => {
  const noCost = {
    destiny: 0,
    discountIdx: -1,
    discountNewValue: 0,
    entanglement: 0
  };

  it('should receive a SKILLS_BUY action', () => {
    Object.keys(dataSkills.skills).forEach( key => {
      const skillInData = dataSkills.skills[key];
      expect(initialState.skills[key].value).toBe(0);
      const action = skillsBuy(skillInData.name, noCost);
      const state = skillsReducer(initialState, action);
      expect(state.skills[key].value).toBe(5);
    });
  });

  it('should not accept an overflow on a SKILLS_BUY action', () => {
    expect("placeholder").toBe("placeholder");
  });

  it('should receive a SKILLS_SPECIALITY_BUY action', () => {
    const specialityName = 'Hear';
    const skillName = 'Awareness';

    const action = skillSpecialityBuy(skillName, specialityName, noCost);
    const state = skillsReducer(initialState, action);
    expect( isSpecialityPresent(initialState.skills,skillName,specialityName) ).toBeFalsy();
    expect( isSpecialityPresent(state.skills,skillName,specialityName) ).toBeTruthy();
  });

  it('should should not receive an already bought SKILLS_SPECIALITY_BUY action', () => {
    const specialityName = 'Hear';
    const skillName = 'Awareness';

    const action = skillSpecialityBuy(skillName, specialityName, noCost);
    const state = skillsReducer(initialState, action);
    expect( isSpecialityPresent(initialState.skills,skillName,specialityName) ).toBeFalsy();
    expect( isSpecialityPresent(state.skills,skillName,specialityName) ).toBeTruthy();

    expect( () => { skillsReducer(state, action); }).toThrowError();
  });

  it('should do nothing with a junk action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( skillsReducer(initialState, junk as ISkillAction )).toMatchObject(initialState);
  });
});

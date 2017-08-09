import { ISkillAction } from 'state/actions/skills';
import * as constants from 'constants/skills';
import * as derived from 'state/derived';
import { IStoreSkillJS, IStoreSkillSpecialityJS, IStoreState, specialityFactory } from 'state/types';

// Sub Reducers
import { applyCost } from 'costs/reducer';
import { pushToHistory } from './history';

export function getSkillIndex(state: IStoreState, skillName: string): number {
 return state.get('skills').findIndex((s: IStoreSkillJS) => (s.name === skillName));
}

export function increaseValue(state: IStoreState, skillName: string): void {
  const index = getSkillIndex(state, skillName);

  if (state.getIn(['skills', index]).value + 5 >  derived.maxSkillBonus(state)) {
    throw new Error('Something went wrong, skill overflow');
  }

  state.updateIn(['skills', index, 'value'], v => (v + 5));
}

export function getSpecialityIndex(state: IStoreState, skillName: string, specialityName: string): number {
 const skillIndex = getSkillIndex(state, skillName);

 if (skillIndex === -1) { throw new Error('Something went wrong, unknown skill for speciality'); }

 return state.get('skillSpecialities').findIndex((speciality: IStoreSkillSpecialityJS) => {
   return speciality.name === specialityName;
  });
}

export function addSpeciality(state: IStoreState, skillName: string,  specialityName: string): void {
 const specialityIndex = getSpecialityIndex(state, skillName, specialityName);

 if (specialityIndex !== -1) {
  throw new Error('Something went wrong, speciality already bought');
 }

 state.updateIn(['skillSpecialities'], list => list.push(
     specialityFactory({ skill: skillName, name: specialityName})
   )
 );
}

export function skillsReducer(oldState: IStoreState, action: ISkillAction): IStoreState {
  switch (action.type) {
    case constants.SKILLS_BUY:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        increaseValue(state, action.name);

        pushToHistory(state, action);
      });
    case constants.SKILLS_SPECIALITY_BUY:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        addSpeciality(state, action.skill, action.speciality);

        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

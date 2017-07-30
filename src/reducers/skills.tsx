import { ISkillAction } from '../actions/skills';
import { IStoreState, IStoreSkillJS, IStoreSkillSpecialityJS, specialityFactory } from '../types/state';
import * as constants from '../constants/skills';
import * as derived from '../containers/derived';

// Sub Reducers
import { applyCost } from './costs';
import { pushToHistory } from './history';

export function getSkillIndex(state: IStoreState, skillName: string): number {
 return state.get('skills')
 .findIndex((s: IStoreSkillJS) => { return s.name === skillName; });
}

export function increaseValue(state: IStoreState, skillName: string): void {
  const index = getSkillIndex(state, skillName);

  if (state.getIn(['skills', index]).value + 5 >  derived.maxSkillBonus(state)) {
    throw 'Something went wrong, skill overflow';
  }

  state.updateIn(['skills', index, 'value'], v => { return v + 5; });
}

export function getSpecialityIndex(state: IStoreState, skillName: string, specialityName: string): number {
 const skillIndex = state.get('skills').findIndex((skill: IStoreSkillJS) => {
  return skill.name === skillName; });

 if (skillIndex === -1) { throw 'Something went wrong, unknown skill for speciality'; }

 return state.get('skillSpecialities').findIndex((speciality: IStoreSkillSpecialityJS) => {
   return speciality.name === specialityName;
  });
}

export function addSpeciality(state: IStoreState, skillName: string,  specialityName: string): void {
 const specialityIndex = getSpecialityIndex(state, skillName, specialityName);

 if (specialityIndex !== -1) {
  throw 'Something went wrong, speciality already bought';
 }

 state.updateIn(['skillSpecialities'], list => { return list.push(
  specialityFactory({ skill: skillName, name: specialityName})
  );
 });
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

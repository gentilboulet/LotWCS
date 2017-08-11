import { ISkillAction } from 'state/actions/skills';
import * as constants from 'constants/skills';
import { IStoreState } from 'state/types';

// Sub Reducers
import { applyCost } from 'costs/reducer';
import { pushToHistory } from 'state/history';
import * as skills from 'state/skills';

export function skillsReducer(oldState: IStoreState, action: ISkillAction): IStoreState {
  switch (action.type) {
    case constants.SKILLS_BUY:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);
        skills.increaseValue(state, action.name);
        pushToHistory(state, action);
      });
    case constants.SKILLS_SPECIALITY_BUY:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);
        skills.addSpeciality(state, action.skill, action.speciality);
        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}

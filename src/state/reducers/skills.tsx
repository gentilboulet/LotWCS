import produce from "immer";

import { ISkillAction } from 'state/actions/skills';
import * as constants from 'state/constants/skills';
import { maxSkillBonus } from 'state/derived';
import { addSpeciality, increase } from 'state/skills';
import { IStoreState } from 'state/type';

export function skillsReducer(baseState: IStoreState, action: ISkillAction): IStoreState {
  switch (action.type) {
    case constants.SKILLS_BUY:
    return produce(baseState, draftState => {
      // applyCosts(draftState, action.cost);
      const max = maxSkillBonus(draftState);
      increase(draftState.skills, action.name, max ? max : 0 );
      draftState.history.push(action);
    });
    case constants.SKILLS_SPECIALITY_BUY:
    return produce(baseState, draftState => {
      // applyCosts(draftState, action.cost);
      addSpeciality(draftState.skills, action.skill, action.speciality);
      draftState.history.push(action);
    });
    default:
  }
  return baseState;
}

import produce from "immer";

import { ISkillAction } from "../actions/skills";
import * as constants from "../constants/skills";
import { maxSkillBonus } from "../derived";

import { applyCost } from "../costs";
import { addSpeciality, increase } from "../skills";
import { IStoreState } from "../type";

export function skillsReducer(
  baseState: IStoreState,
  action: ISkillAction
): IStoreState {
  switch (action.type) {
    case constants.SKILLS_BUY:
      return produce(baseState, draftState => {
        applyCost(draftState, action.cost);
        const max = maxSkillBonus(draftState);
        increase(draftState.skills, action.name, max);
        draftState.history.push(action);
      });
    case constants.SKILLS_SPECIALITY_BUY:
      return produce(baseState, draftState => {
        applyCost(draftState, action.cost);
        addSpeciality(draftState.skills, action.skill, action.speciality);
        draftState.history.push(action);
      });
    default:
  }
  return baseState;
}

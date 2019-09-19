import produce from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/skills";
import { maxSkillBonus } from "../derived";

import { applyCost } from "../costs";
import { addSpeciality, increase } from "../skills";
import { IStoreState } from "../type";

export function skillsReducer(
  baseState: IStoreState,
  action: ActionType<typeof actions>
): IStoreState {
  switch (action.type) {
    case getType(actions.skillsBuy):
      return produce(baseState, draftState => {
        applyCost(draftState, action.payload.cost);
        const max = maxSkillBonus(draftState);
        increase(draftState.skills, action.payload.name, max);
      });
    case getType(actions.skillSpecialityBuy):
      return produce(baseState, draftState => {
        applyCost(draftState, action.payload.cost);
        addSpeciality(
          draftState.skills,
          action.payload.skill,
          action.payload.speciality
        );
      });
    default:
  }
  return baseState;
}

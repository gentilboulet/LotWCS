import produce from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/skills";
import { maxSkillBonus } from "../models/derived";

import { applyCost } from "../models/costs";
import { addSpeciality, increase } from "../models/skills";
import { ICharacterState } from "../models/type";

export function skillsReducer(
  baseState: ICharacterState,
  action: ActionType<typeof actions>
): ICharacterState {
  switch (action.type) {
    case getType(actions.skillsBuy):
      return produce(baseState, draftState => {
        const max = maxSkillBonus(baseState);
        applyCost(draftState, action.payload.cost);
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

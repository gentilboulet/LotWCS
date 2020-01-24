import produce from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/skills";
import { addSpeciality, increase, TSkillsState } from "../models/skills";

export function skillsReducer(
  state: TSkillsState,
  action: ActionType<typeof actions>,
): TSkillsState {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.skillsBuy):
        increase(draft, action.payload.name);
        break;
      case getType(actions.skillSpecialityBuy):
        addSpeciality(draft, action.payload.skill, action.payload.speciality);
        break;
      default:
    }
  });
}

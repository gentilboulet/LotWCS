import { Draft, produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/character/skills";
import {
  addSpeciality,
  increase,
  TSkillsState,
} from "../../models/character/skills";

export const skillsReducer = produce(
  (draft: Draft<TSkillsState>, action: ActionType<typeof actions>) => {
    switch (action.type) {
      case getType(actions.skillsBuy):
        increase(draft, action.payload.name);
        break;
      case getType(actions.skillSpecialityBuy):
        addSpeciality(draft, action.payload.skill, action.payload.speciality);
        break;
      default:
    }
  },
);

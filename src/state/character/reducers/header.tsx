import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/header";
import { setRank } from "../models/header";
import { ICharacterState } from "../models/type";

export function headerReducer(
  state: ICharacterState,
  action: ActionType<typeof actions>,
): ICharacterState {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.setName):
        draft.name = action.payload.name;
        break;
      case getType(actions.setConcept):
        draft.concept = action.payload.concept;
        break;
      case getType(actions.setRank):
        setRank(draft, action.payload.rank);
        break;
      case getType(actions.setArchetype):
        draft.archetype = action.payload.archetype;
        break;
      default:
    }
  });
}

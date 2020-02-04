import { Draft, produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/character/header";
import { ICharacterState } from "../../models/character";
import { setRank } from "../../models/character/header";

export const headerReducer = produce(
  (draft: Draft<ICharacterState>, action: ActionType<typeof actions>) => {
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
  },
);

import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/header";
import { setRank } from "../models/header";
import { ICharacterState } from "../models/type";

export function headerReducer(
  baseState: ICharacterState,
  action: ActionType<typeof actions>
): ICharacterState {
  switch (action.type) {
    case getType(actions.setName):
      return produce(baseState, draftState => {
        draftState.name = action.payload.name;
      });
    case getType(actions.setConcept):
      return produce(baseState, draftState => {
        draftState.concept = action.payload.concept;
      });
    case getType(actions.setRank):
      return produce(baseState, draftState => {
        setRank(draftState, action.payload.rank);
      });
    case getType(actions.setArchetype):
      return produce(baseState, draftState => {
        draftState.archetype = action.payload.archetype;
      });
    default:
  }
  return baseState;
}

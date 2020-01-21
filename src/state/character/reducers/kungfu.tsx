import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/kungfu";
import { ICharacterState } from "../models/type";

import { applyCost } from "../models/costs";

import * as dataKungfu from "../../../data/kungfu";
import * as chi from "../models/chi";
import { addKungFuTechnique, openStyle } from "../models/kungfu";

export function kungfuReducer(
  baseState: ICharacterState,
  action: ActionType<typeof actions>
): ICharacterState {
  switch (action.type) {
    case getType(actions.openStyle):
      return produce(baseState, draftState => {
        applyCost(draftState, action.payload.cost);
        openStyle(
          draftState.kungfu,
          action.payload.kungfuType,
          action.payload.uid
        );

        chi.increaseCultivation(
          draftState.chi,
          dataKungfu.getKungfuChi(
            action.payload.kungfuType,
            action.payload.uid
          ),
          action.payload.cost.original
        );
      });
    case getType(actions.buyTechnique):
      return produce(baseState, draftState => {
        applyCost(draftState, action.payload.cost);
        addKungFuTechnique(
          draftState.kungfu,
          action.payload.kungfuType,
          action.payload.styleUid,
          action.payload.uid
        );

        chi.increaseCultivation(
          draftState.chi,
          dataKungfu.getKungfuChi(
            action.payload.kungfuType,
            action.payload.styleUid
          ),

          action.payload.cost.original
        );
      });
    case getType(actions.customStyleName):
    case getType(actions.customTechniqueName):
    default:
  }
  return baseState;
}

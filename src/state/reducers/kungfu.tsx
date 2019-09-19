import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/kungfu";
import { IStoreState } from "../type";

import { applyCost } from "../costs";

import * as dataKungfu from "../../data/kungfu";
import { addKungFuTechnique, openStyle } from "../kungfu";

import * as chi from "../chi";

export function kungfuReducer(
  baseState: IStoreState,
  action: ActionType<typeof actions>
): IStoreState {
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
          action.payload.cost.destiny
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

          action.payload.cost.destiny
        );
      });
    case getType(actions.customStyleName):
    case getType(actions.customTechniqueName):
    default:
  }
  return baseState;
}

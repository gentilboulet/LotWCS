import { produce } from "immer";

import { IKungFuAction } from "../actions/kungfu";
import { IStoreState } from "../type";

import { applyCost } from "../costs";

import * as dataKungfu from "../../data/kungfu";
import {
  IDataInternalKungfu,
  KUNGFU_EXTERNAL,
  KUNGFU_INTERNAL
} from "../../data/kungfu/types";
import * as constants from "../constants/kungfu";
import { addKungFuTechnique, openStyle } from "../kungfu";

import * as chi from "../chi";

export function kungfuReducer(
  baseState: IStoreState,
  action: IKungFuAction
): IStoreState {
  switch (action.type) {
    case constants.KUNGFU_OPEN_STYLE:
      return produce(baseState, draftState => {
        applyCost(draftState, action.cost);
        openStyle(draftState.kungfu, action.kungfuType, action.uid);

        if (action.kungfuType === KUNGFU_EXTERNAL) {
          chi.increaseCultivation(
            draftState.chi,
            "general",
            action.cost.destiny
          );
        } else {
          const data = dataKungfu.kungfuData(
            KUNGFU_INTERNAL,
            action.uid
          ) as IDataInternalKungfu;
          chi.increaseCultivation(
            draftState.chi,
            data.element,
            action.cost.destiny
          );
        }

        draftState.history.push(action);
      });
    case constants.KUNGFU_BUY_TECHNIQUE:
      return produce(baseState, draftState => {
        applyCost(draftState, action.cost);
        addKungFuTechnique(
          draftState.kungfu,
          action.kungfuType,
          action.styleUid,
          action.uid
        );

        if (action.kungfuType === KUNGFU_EXTERNAL) {
          chi.increaseCultivation(
            draftState.chi,
            "general",
            action.cost.destiny
          );
        } else {
          const data = dataKungfu.kungfuData(
            KUNGFU_INTERNAL,
            action.uid
          ) as IDataInternalKungfu;
          chi.increaseCultivation(
            draftState.chi,
            data.element,
            action.cost.destiny
          );
        }

        draftState.history.push(action);
      });
    case constants.KUNGFU_CUSTOM_NAME_FOR_STYLE:
    case constants.KUNGFU_CUSTOM_NAME_FOR_TECHNIQUE:
    default:
  }
  return baseState;
}
